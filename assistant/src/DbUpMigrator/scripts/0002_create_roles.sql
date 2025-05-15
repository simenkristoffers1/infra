DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles WHERE rolname = 'api_user'
  ) THEN
    CREATE ROLE api_user;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO api_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api_user;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles WHERE rolname = 'search_user'
  ) THEN
    CREATE ROLE search_user;
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles WHERE rolname = 'indexation_user'
  ) THEN
    CREATE ROLE indexation_user;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA knowledge TO search_user, indexation_user;

GRANT SELECT ON ALL TABLES IN SCHEMA knowledge TO search_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA knowledge TO indexation_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA knowledge
GRANT SELECT ON TABLES TO search_user;
GRANT EXECUTE ON FUNCTION rrf_score(bigint, integer) TO search_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA knowledge
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO indexation_user;