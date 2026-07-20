export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          created_at: string | null
          id: string
          new_values: Json | null
          old_values: Json | null
          operation: string
          table_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          operation: string
          table_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          operation?: string
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          address: string
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          category: string
          created_at: string
          description: string | null
          end_date: string | null
          event_type: string
          featured: boolean | null
          gallery_urls: string[] | null
          id: string
          image_url: string | null
          latitude: number | null
          liability_clause: string | null
          location: string
          longitude: number | null
          max_age: number | null
          max_participants: number | null
          min_age: number | null
          organizer_id: string
          organizer_notes: string | null
          privacy_clause: string | null
          refund_policy: string | null
          registration_end: string
          registration_start: string
          regulations_pdf_url: string | null
          regulations_text: string | null
          rejection_reason: string | null
          requires_medical_certificate: boolean | null
          start_date: string
          status: string
          subcategory: string | null
          submitted_for_approval_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          address: string
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type: string
          featured?: boolean | null
          gallery_urls?: string[] | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          liability_clause?: string | null
          location: string
          longitude?: number | null
          max_age?: number | null
          max_participants?: number | null
          min_age?: number | null
          organizer_id: string
          organizer_notes?: string | null
          privacy_clause?: string | null
          refund_policy?: string | null
          registration_end: string
          registration_start?: string
          regulations_pdf_url?: string | null
          regulations_text?: string | null
          rejection_reason?: string | null
          requires_medical_certificate?: boolean | null
          start_date: string
          status?: string
          subcategory?: string | null
          submitted_for_approval_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          address?: string
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type?: string
          featured?: boolean | null
          gallery_urls?: string[] | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          liability_clause?: string | null
          location?: string
          longitude?: number | null
          max_age?: number | null
          max_participants?: number | null
          min_age?: number | null
          organizer_id?: string
          organizer_notes?: string | null
          privacy_clause?: string | null
          refund_policy?: string | null
          registration_end?: string
          registration_start?: string
          regulations_pdf_url?: string | null
          regulations_text?: string | null
          rejection_reason?: string | null
          requires_medical_certificate?: boolean | null
          start_date?: string
          status?: string
          subcategory?: string | null
          submitted_for_approval_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          billing_address: Json | null
          created_at: string
          currency: string
          due_date: string | null
          id: string
          invoice_number: string
          issued_date: string
          line_items: Json
          notes: string | null
          order_id: string | null
          organizer_id: string | null
          paid_date: string | null
          status: string
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          issued_date?: string
          line_items?: Json
          notes?: string | null
          order_id?: string | null
          organizer_id?: string | null
          paid_date?: string | null
          status?: string
          subtotal: number
          tax_amount?: number
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          issued_date?: string
          line_items?: Json
          notes?: string | null
          order_id?: string | null
          organizer_id?: string | null
          paid_date?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          category: string
          created_at: string
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          sent_at: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          sent_at?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          sent_at?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          billing_data: Json | null
          created_at: string
          currency: string
          discount_amount: number
          easypay_id: string | null
          event_id: string | null
          fees_amount: number
          id: string
          metadata: Json | null
          notes: string | null
          order_number: string
          payment_date: string | null
          payment_method: string | null
          payment_provider: string | null
          payment_status: string
          refund_amount: number | null
          refund_reason: string | null
          registration_id: string | null
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_data?: Json | null
          created_at?: string
          currency?: string
          discount_amount?: number
          easypay_id?: string | null
          event_id?: string | null
          fees_amount?: number
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_number: string
          payment_date?: string | null
          payment_method?: string | null
          payment_provider?: string | null
          payment_status?: string
          refund_amount?: number | null
          refund_reason?: string | null
          registration_id?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_data?: Json | null
          created_at?: string
          currency?: string
          discount_amount?: number
          easypay_id?: string | null
          event_id?: string | null
          fees_amount?: number
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_number?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_provider?: string | null
          payment_status?: string
          refund_amount?: number | null
          refund_reason?: string | null
          registration_id?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          config: Json
          created_at: string
          currency: string
          fees_fixed: number | null
          fees_percentage: number | null
          id: string
          is_active: boolean
          name: string
          provider: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          currency?: string
          fees_fixed?: number | null
          fees_percentage?: number | null
          id?: string
          is_active?: boolean
          name: string
          provider: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          currency?: string
          fees_fixed?: number | null
          fees_percentage?: number | null
          id?: string
          is_active?: boolean
          name?: string
          provider?: string
          updated_at?: string
        }
        Relationships: []
      }
      payouts: {
        Row: {
          amount: number
          bank_account_info: Json | null
          created_at: string
          currency: string
          events_included: string[] | null
          fees: number | null
          id: string
          metadata: Json | null
          net_amount: number | null
          organizer_id: string
          payment_method: string | null
          payout_number: string
          period_end: string
          period_start: string
          processed_at: string | null
          reference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          bank_account_info?: Json | null
          created_at?: string
          currency?: string
          events_included?: string[] | null
          fees?: number | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          organizer_id: string
          payment_method?: string | null
          payout_number: string
          period_end: string
          period_start: string
          processed_at?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          bank_account_info?: Json | null
          created_at?: string
          currency?: string
          events_included?: string[] | null
          fees?: number | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          organizer_id?: string
          payment_method?: string | null
          payout_number?: string
          period_end?: string
          period_start?: string
          processed_at?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          last_name: string | null
          organization_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          team_captain_name: string | null
          team_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          organization_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          team_captain_name?: string | null
          team_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          organization_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          team_captain_name?: string | null
          team_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          amount_paid: number
          bib_number: string | null
          check_in_status: string
          check_in_time: string | null
          created_at: string
          discount_amount: number | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          event_id: string
          id: string
          medical_conditions: string | null
          participant_birth_date: string | null
          participant_document_number: string | null
          participant_email: string
          participant_gender: string | null
          participant_id: string | null
          participant_name: string
          participant_nationality: string | null
          participant_phone: string | null
          payment_method: string | null
          payment_status: string
          registration_number: string | null
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          team_name: string | null
          ticket_type_id: string
          tshirt_size: string | null
          updated_at: string
          voucher_code: string | null
        }
        Insert: {
          amount_paid?: number
          bib_number?: string | null
          check_in_status?: string
          check_in_time?: string | null
          created_at?: string
          discount_amount?: number | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          event_id: string
          id?: string
          medical_conditions?: string | null
          participant_birth_date?: string | null
          participant_document_number?: string | null
          participant_email: string
          participant_gender?: string | null
          participant_id?: string | null
          participant_name: string
          participant_nationality?: string | null
          participant_phone?: string | null
          payment_method?: string | null
          payment_status?: string
          registration_number?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          team_name?: string | null
          ticket_type_id: string
          tshirt_size?: string | null
          updated_at?: string
          voucher_code?: string | null
        }
        Update: {
          amount_paid?: number
          bib_number?: string | null
          check_in_status?: string
          check_in_time?: string | null
          created_at?: string
          discount_amount?: number | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          event_id?: string
          id?: string
          medical_conditions?: string | null
          participant_birth_date?: string | null
          participant_document_number?: string | null
          participant_email?: string
          participant_gender?: string | null
          participant_id?: string | null
          participant_name?: string
          participant_nationality?: string | null
          participant_phone?: string | null
          payment_method?: string | null
          payment_status?: string
          registration_number?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          team_name?: string | null
          ticket_type_id?: string
          tshirt_size?: string | null
          updated_at?: string
          voucher_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          bib_number: string | null
          category: string | null
          created_at: string
          dnf: boolean | null
          dsq: boolean | null
          event_id: string
          finish_time: string | null
          gender: string | null
          id: string
          notes: string | null
          participant_name: string
          position_category: number | null
          position_gender: number | null
          position_overall: number | null
          registration_id: string
          updated_at: string
        }
        Insert: {
          bib_number?: string | null
          category?: string | null
          created_at?: string
          dnf?: boolean | null
          dsq?: boolean | null
          event_id: string
          finish_time?: string | null
          gender?: string | null
          id?: string
          notes?: string | null
          participant_name: string
          position_category?: number | null
          position_gender?: number | null
          position_overall?: number | null
          registration_id: string
          updated_at?: string
        }
        Update: {
          bib_number?: string | null
          category?: string | null
          created_at?: string
          dnf?: boolean | null
          dsq?: boolean | null
          event_id?: string
          finish_time?: string | null
          gender?: string | null
          id?: string
          notes?: string | null
          participant_name?: string
          position_category?: number | null
          position_gender?: number | null
          position_overall?: number | null
          registration_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string
          description: string
          id: string
          priority: string
          resolution: string | null
          resolved_at: string | null
          status: string
          subject: string
          ticket_number: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          description: string
          id?: string
          priority?: string
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          subject: string
          ticket_number: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          priority?: string
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          subject?: string
          ticket_number?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ticket_types: {
        Row: {
          age_group: string | null
          created_at: string
          currency: string
          description: string | null
          early_bird_end_date: string | null
          early_bird_price: number | null
          event_id: string
          gender_restriction: string | null
          id: string
          includes_insurance: boolean | null
          includes_kit: boolean | null
          includes_meal: boolean | null
          includes_tshirt: boolean | null
          is_active: boolean | null
          max_age: number | null
          max_quantity: number | null
          min_age: number | null
          name: string
          price: number
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          age_group?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          early_bird_end_date?: string | null
          early_bird_price?: number | null
          event_id: string
          gender_restriction?: string | null
          id?: string
          includes_insurance?: boolean | null
          includes_kit?: boolean | null
          includes_meal?: boolean | null
          includes_tshirt?: boolean | null
          is_active?: boolean | null
          max_age?: number | null
          max_quantity?: number | null
          min_age?: number | null
          name: string
          price?: number
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          age_group?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          early_bird_end_date?: string | null
          early_bird_price?: number | null
          event_id?: string
          gender_restriction?: string | null
          id?: string
          includes_insurance?: boolean | null
          includes_kit?: boolean | null
          includes_meal?: boolean | null
          includes_tshirt?: boolean | null
          is_active?: boolean | null
          max_age?: number | null
          max_quantity?: number | null
          min_age?: number | null
          name?: string
          price?: number
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          net_amount: number | null
          order_id: string | null
          payment_method: string | null
          platform_fee: number | null
          processed_at: string | null
          provider_fee: number | null
          provider_transaction_id: string | null
          status: string
          transaction_number: string
          type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          order_id?: string | null
          payment_method?: string | null
          platform_fee?: number | null
          processed_at?: string | null
          provider_fee?: number | null
          provider_transaction_id?: string | null
          status?: string
          transaction_number: string
          type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          order_id?: string | null
          payment_method?: string | null
          platform_fee?: number | null
          processed_at?: string | null
          provider_fee?: number | null
          provider_transaction_id?: string | null
          status?: string
          transaction_number?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          applies_to_ticket_types: string[] | null
          code: string
          created_at: string
          current_uses: number | null
          description: string | null
          discount_type: string
          discount_value: number
          event_id: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          minimum_purchase_amount: number | null
          organizer_id: string
          updated_at: string
          valid_from: string
          valid_until: string
        }
        Insert: {
          applies_to_ticket_types?: string[] | null
          code: string
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type: string
          discount_value: number
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          minimum_purchase_amount?: number | null
          organizer_id: string
          updated_at?: string
          valid_from?: string
          valid_until: string
        }
        Update: {
          applies_to_ticket_types?: string[] | null
          code?: string
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          minimum_purchase_amount?: number | null
          organizer_id?: string
          updated_at?: string
          valid_from?: string
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: { Args: never; Returns: string }
    }
    Enums: {
      user_role: "admin" | "organizer" | "participant" | "team"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "organizer", "participant", "team"],
    },
  },
} as const
