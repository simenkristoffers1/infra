CREATE TABLE conversations (
    id uuid NOT NULL,
    owner_id uuid NOT NULL,
    messages jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT pk_conversations PRIMARY KEY (id)
);

CREATE TABLE knowledge_documents (
    id uuid NOT NULL,
    external_id text NOT NULL,
    source text NOT NULL,
    title text NOT NULL,
    url text,
    document_type text NOT NULL,
    tags text[] NOT NULL,
    categories text[] NOT NULL,
    language text NOT NULL,
    content_type text NOT NULL,
    content_length integer NOT NULL,
    document_hash text NOT NULL,
    embedding_contents_hash text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT pk_knowledge_documents PRIMARY KEY (id)
);

CREATE TABLE profiles (
    id uuid NOT NULL,
    name text NOT NULL,
    system_prompt text,
    is_actions_enabled boolean NOT NULL,
    plugins text[] NOT NULL,
    is_support_enabled boolean NOT NULL,
    sources text[] NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT pk_profiles PRIMARY KEY (id)
);

CREATE UNIQUE INDEX ix_knowledge_documents_external_id ON knowledge_documents (external_id);

CREATE INDEX ix_knowledge_documents_source ON knowledge_documents (source);
