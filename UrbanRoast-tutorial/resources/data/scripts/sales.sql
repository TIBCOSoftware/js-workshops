-- Table: public.sales

-- DROP TABLE public.sales;

CREATE TABLE public.sales
(
    date_by_month date,
    location character(35) COLLATE pg_catalog."default",
    net_sales numeric,
    food_cost numeric,
    labor_cost numeric,
    facility_cost numeric,
    marketing_cost numeric
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.sales
    OWNER to postgres;