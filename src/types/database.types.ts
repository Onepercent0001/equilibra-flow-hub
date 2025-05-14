
import { Database } from "@/integrations/supabase/types";

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Account = Database['public']['Tables']['accounts']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type Goal = Database['public']['Tables']['goals']['Row'];
export type Integration = Database['public']['Tables']['integrations']['Row'];
