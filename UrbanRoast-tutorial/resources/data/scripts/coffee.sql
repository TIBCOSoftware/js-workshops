-- Table: public.coffee

-- DROP TABLE public.coffee;

CREATE TABLE public.coffee
(
    batch_num numeric,
    coffee_id numeric,
    coffee_name character varying COLLATE pg_catalog."default",
    fragrance numeric,
    taste numeric,
    aftertaste numeric,
    acidity numeric,
    body numeric,
    uniformity numeric,
    clean_cup numeric,
    balance numeric,
    sweetness numeric,
    overall numeric,
    aroma1 character varying COLLATE pg_catalog."default",
    aroma2 character varying COLLATE pg_catalog."default",
    aroma3 character varying COLLATE pg_catalog."default",
    blend character varying COLLATE pg_catalog."default",
    origin_country character varying COLLATE pg_catalog."default",
    garnish character varying COLLATE pg_catalog."default",
    kg_used numeric,
    kg_roast numeric,
    kg_per_roast numeric,
    country_code character varying COLLATE pg_catalog."default",
    ingredient_id numeric,
    on_goal numeric,
    to_profile numeric,
    roasted numeric,
    shipped numeric
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.coffee
    OWNER to postgres;