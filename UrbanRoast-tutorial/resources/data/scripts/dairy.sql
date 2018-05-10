-- Table: public.dairy

-- DROP TABLE public.dairy;

CREATE TABLE public.dairy
(
    "ID" numeric NOT NULL,
    "Name" character varying COLLATE pg_catalog."default",
    "Type" character varying COLLATE pg_catalog."default",
    "LowFat" boolean,
    CONSTRAINT "Dairy_pkey" PRIMARY KEY ("ID")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.dairy
    OWNER to postgres;