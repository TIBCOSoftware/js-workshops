-- Table: public.ingredient

-- DROP TABLE public.ingredient;

CREATE TABLE public.ingredient
(
    id numeric NOT NULL,
    name character varying COLLATE pg_catalog."default",
    type character varying COLLATE pg_catalog."default",
    sub_type character varying COLLATE pg_catalog."default",
    rating numeric,
    price numeric,
    caffeine numeric,
    sugar numeric,
    total_fat numeric,
    alcohol numeric,
    CONSTRAINT supplement_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.ingredient
    OWNER to postgres;