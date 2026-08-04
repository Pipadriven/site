ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS solution text;
ALTER TABLE public.leads ADD CONSTRAINT leads_solution_length CHECK (solution IS NULL OR length(solution) <= 100);