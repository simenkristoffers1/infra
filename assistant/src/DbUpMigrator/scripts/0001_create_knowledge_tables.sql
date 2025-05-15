CREATE SCHEMA IF NOT EXISTS knowledge;

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE knowledge.documents (
    id UUID PRIMARY KEY,
    external_id TEXT NOT NULL,
    source TEXT NOT NULL,
    url TEXT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    products TEXT[] NOT NULL DEFAULT '{}',
    source_created_at TIMESTAMPTZ,
    source_updated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    checksum TEXT NOT NULL,
    UNIQUE(source, external_id)
);
CREATE INDEX IF NOT EXISTS idx_documents_source_external_id ON knowledge.documents(source, external_id);

INSERT INTO knowledge.documents (
    id,
    external_id,
    source,
    url,
    title,
    content,
    products,
    source_created_at,
    source_updated_at,
    created_at,
    updated_at,
    checksum
)
SELECT
    id,
    external_id,
    source,
    url,
    title,
    content,
    tags as products,
    NULL,
    NULL,
    created_at,
    updated_at,
    document_hash
FROM
    public.knowledge_documents;

DROP TABLE IF EXISTS public.knowledge_documents;


CREATE TABLE IF NOT EXISTS knowledge.pipelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_pipelines_type ON knowledge.pipelines (type);
CREATE INDEX idx_pipelines_created_at ON knowledge.pipelines (created_at);


CREATE TYPE knowledge.pipeline_status AS ENUM ('running', 'completed', 'failed');
CREATE TYPE knowledge.pipeline_run_mode AS ENUM ('full', 'incremental');

CREATE TABLE IF NOT EXISTS knowledge.pipeline_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pipeline_id UUID NOT NULL,
    status knowledge.pipeline_status NOT NULL,
    run_mode knowledge.pipeline_run_mode NOT NULL,
    documents_processed INTEGER NOT NULL DEFAULT 0,
    documents_skipped INTEGER NOT NULL DEFAULT 0,
    chunks_created INTEGER NOT NULL DEFAULT 0,
    errors INTEGER NOT NULL DEFAULT 0,
    high_water_mark_timestamp TIMESTAMPTZ,
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pipeline FOREIGN KEY(pipeline_id) REFERENCES knowledge.pipelines(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pipeline_jobs_pipeline_id_status ON knowledge.pipeline_jobs(pipeline_id, status);

CREATE TABLE IF NOT EXISTS knowledge.chunks (
    id UUID PRIMARY KEY,
    document_id UUID NOT NULL,
    source TEXT NOT NULL,
    url TEXT,
    products TEXT[] NOT NULL DEFAULT '{}',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(1024),
    chunk_index INTEGER NOT NULL DEFAULT 0,
    source_created_at TIMESTAMPTZ,
    source_updated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_document FOREIGN KEY(document_id) REFERENCES knowledge.documents(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON knowledge.chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_chunks_source ON knowledge.chunks(source);
CREATE INDEX IF NOT EXISTS idx_chunks_products ON knowledge.chunks USING GIN(products);
CREATE INDEX IF NOT EXISTS idx_chunks_content ON knowledge.chunks USING GIN (to_tsvector('english', content));
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON knowledge.chunks USING hnsw(embedding vector_cosine_ops) WITH (ef_construction=256);
                        
CREATE OR REPLACE FUNCTION rrf_score(rank bigint, rrf_k int DEFAULT 50)
    RETURNS numeric
    LANGUAGE SQL
    IMMUTABLE PARALLEL SAFE
    AS $$
        SELECT COALESCE(1.0 / ($1 + $2), 0.0);
    $$;