-- Table: public.drink

-- DROP TABLE public.drink;

CREATE TABLE public.drink
(
    drink_id numeric NOT NULL,
    drink_name character varying COLLATE pg_catalog."default",
    pronunciation character varying COLLATE pg_catalog."default",
    fl_oz numeric,
    popularity numeric,
    hot_cold character varying COLLATE pg_catalog."default",
    has_ice boolean,
    pct_water numeric,
    pct_milk numeric,
    pct_foam numeric,
    pct_cream numeric,
    pct_coffee numeric,
    pct_espresso numeric,
    pct_tea numeric,
    pct_alcohol numeric,
    shot_espresso numeric,
    shot_alcohol numeric,
    pump_additive1 numeric,
    pump_additive2 numeric,
    additive1 character varying COLLATE pg_catalog."default",
    additive2 character varying COLLATE pg_catalog."default",
    milk_type character varying COLLATE pg_catalog."default",
    cream_type character varying COLLATE pg_catalog."default",
    coffee_type character varying COLLATE pg_catalog."default",
    tea_type character varying COLLATE pg_catalog."default",
    alcohol_type character varying COLLATE pg_catalog."default",
    garnish character varying COLLATE pg_catalog."default",
    note1 character varying COLLATE pg_catalog."default",
    calories numeric,
    drink_url character varying COLLATE pg_catalog."default",
    caf_perc numeric,
    sug_perc numeric,
    ingredient_type1 character varying COLLATE pg_catalog."default",
    ingredient_type2 character varying COLLATE pg_catalog."default",
    ingredient_type3 character varying COLLATE pg_catalog."default",
    ingredient_type4 character varying COLLATE pg_catalog."default",
    ingredient_type5 character varying COLLATE pg_catalog."default",
    "Mocha" boolean,
    "Coffee" boolean,
    "Syrup" boolean,
    "Liquor" boolean,
    "Milk" boolean,
    "Cream" boolean,
    "Milk_Substitute" boolean,
    pct_syrup numeric,
    has_whip boolean,
    CONSTRAINT drink_pkey PRIMARY KEY (drink_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.drink
    OWNER to postgres;