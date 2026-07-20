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
      age_groups: {
        Row: {
          category: string | null
          category_id: string | null
          created_at: string
          description: string | null
          event_id: string | null
          gender: string | null
          id: string
          is_active: boolean
          max_age: number | null
          min_age: number | null
          name: string
          sort_order: number | null
          subcategory: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          event_id?: string | null
          gender?: string | null
          id?: string
          is_active?: boolean
          max_age?: number | null
          min_age?: number | null
          name: string
          sort_order?: number | null
          subcategory?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          event_id?: string | null
          gender?: string | null
          id?: string
          is_active?: boolean
          max_age?: number | null
          min_age?: number | null
          name?: string
          sort_order?: number | null
          subcategory?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "age_groups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
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
      email_logs: {
        Row: {
          created_at: string
          delivered_at: string | null
          error_message: string | null
          failed_at: string | null
          id: string
          metadata: Json | null
          opened_at: string | null
          provider: string | null
          provider_message_id: string | null
          recipient_email: string
          sender_email: string | null
          sent_at: string | null
          status: string
          subject: string
          template_key: string | null
          template_name: string | null
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          provider?: string | null
          provider_message_id?: string | null
          recipient_email: string
          sender_email?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          template_key?: string | null
          template_name?: string | null
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          provider?: string | null
          provider_message_id?: string | null
          recipient_email?: string
          sender_email?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          template_key?: string | null
          template_name?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          category: string
          created_at: string
          description: string | null
          html_content: string | null
          html_template: string | null
          id: string
          is_active: boolean
          name: string | null
          subject: string | null
          subject_template: string | null
          template_key: string | null
          text_content: string | null
          updated_at: string
          variables: Json | null
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          html_content?: string | null
          html_template?: string | null
          id?: string
          is_active?: boolean
          name?: string | null
          subject?: string | null
          subject_template?: string | null
          template_key?: string | null
          text_content?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          html_content?: string | null
          html_template?: string | null
          id?: string
          is_active?: boolean
          name?: string | null
          subject?: string | null
          subject_template?: string | null
          template_key?: string | null
          text_content?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      event_checkins: {
        Row: {
          bib_number: string | null
          checked_in_by: string | null
          checkin_method: string
          checkin_time: string
          created_at: string
          event_id: string
          id: string
          notes: string | null
          participant_email: string
          participant_id: string | null
          participant_name: string
          registration_id: string
          scanner_user_id: string | null
        }
        Insert: {
          bib_number?: string | null
          checked_in_by?: string | null
          checkin_method?: string
          checkin_time?: string
          created_at?: string
          event_id: string
          id?: string
          notes?: string | null
          participant_email: string
          participant_id?: string | null
          participant_name: string
          registration_id: string
          scanner_user_id?: string | null
        }
        Update: {
          bib_number?: string | null
          checked_in_by?: string | null
          checkin_method?: string
          checkin_time?: string
          created_at?: string
          event_id?: string
          id?: string
          notes?: string | null
          participant_email?: string
          participant_id?: string | null
          participant_name?: string
          registration_id?: string
          scanner_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_checkins_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_checkins_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      event_commissions: {
        Row: {
          applies_to_ticket_types: string[] | null
          commission_type: string
          commission_value: number
          created_at: string
          description: string | null
          event_id: string
          fixed_fee: number | null
          id: string
          is_active: boolean
          notes: string | null
          organizer_id: string | null
          updated_at: string
        }
        Insert: {
          applies_to_ticket_types?: string[] | null
          commission_type?: string
          commission_value?: number
          created_at?: string
          description?: string | null
          event_id: string
          fixed_fee?: number | null
          id?: string
          is_active?: boolean
          notes?: string | null
          organizer_id?: string | null
          updated_at?: string
        }
        Update: {
          applies_to_ticket_types?: string[] | null
          commission_type?: string
          commission_value?: number
          created_at?: string
          description?: string | null
          event_id?: string
          fixed_fee?: number | null
          id?: string
          is_active?: boolean
          notes?: string | null
          organizer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_commissions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_qr_codes: {
        Row: {
          code: string | null
          created_at: string
          created_by: string | null
          event_id: string
          id: string
          is_active: boolean
          is_used: boolean
          metadata: Json | null
          qr_code_data: string | null
          qr_code_url: string | null
          qr_type: string
          registration_id: string | null
          used_at: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          created_by?: string | null
          event_id: string
          id?: string
          is_active?: boolean
          is_used?: boolean
          metadata?: Json | null
          qr_code_data?: string | null
          qr_code_url?: string | null
          qr_type?: string
          registration_id?: string | null
          used_at?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          created_by?: string | null
          event_id?: string
          id?: string
          is_active?: boolean
          is_used?: boolean
          metadata?: Json | null
          qr_code_data?: string | null
          qr_code_url?: string | null
          qr_type?: string
          registration_id?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_qr_codes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_qr_codes_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
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
          event_regulation: string | null
          event_type: string
          featured: boolean | null
          gallery_urls: string[] | null
          id: string
          image_rights_clause: string | null
          image_url: string | null
          latitude: number | null
          liability_clause: string | null
          liability_waiver: string | null
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
          regulation_document_url: string | null
          regulations_pdf_url: string | null
          regulations_text: string | null
          rejection_reason: string | null
          requires_medical_certificate: boolean | null
          slug: string | null
          start_date: string
          status: string
          subcategory: string | null
          submitted_for_approval_at: string | null
          terms_and_conditions: string | null
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
          event_regulation?: string | null
          event_type: string
          featured?: boolean | null
          gallery_urls?: string[] | null
          id?: string
          image_rights_clause?: string | null
          image_url?: string | null
          latitude?: number | null
          liability_clause?: string | null
          liability_waiver?: string | null
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
          regulation_document_url?: string | null
          regulations_pdf_url?: string | null
          regulations_text?: string | null
          rejection_reason?: string | null
          requires_medical_certificate?: boolean | null
          slug?: string | null
          start_date: string
          status?: string
          subcategory?: string | null
          submitted_for_approval_at?: string | null
          terms_and_conditions?: string | null
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
          event_regulation?: string | null
          event_type?: string
          featured?: boolean | null
          gallery_urls?: string[] | null
          id?: string
          image_rights_clause?: string | null
          image_url?: string | null
          latitude?: number | null
          liability_clause?: string | null
          liability_waiver?: string | null
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
          regulation_document_url?: string | null
          regulations_pdf_url?: string | null
          regulations_text?: string | null
          rejection_reason?: string | null
          requires_medical_certificate?: boolean | null
          slug?: string | null
          start_date?: string
          status?: string
          subcategory?: string | null
          submitted_for_approval_at?: string | null
          terms_and_conditions?: string | null
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
      newsletter_subscriptions: {
        Row: {
          categories: string[] | null
          confirmation_token: string | null
          confirmed: boolean
          confirmed_at: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          last_name: string | null
          preferences: Json | null
          subscribed_at: string
          unsubscribed_at: string | null
          user_id: string | null
        }
        Insert: {
          categories?: string[] | null
          confirmation_token?: string | null
          confirmed?: boolean
          confirmed_at?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          preferences?: Json | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Update: {
          categories?: string[] | null
          confirmation_token?: string | null
          confirmed?: boolean
          confirmed_at?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          preferences?: Json | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Relationships: []
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
          affiliation_code: string | null
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          cae: string | null
          city: string | null
          company_address: string | null
          company_city: string | null
          company_nif: string | null
          company_phone: string | null
          created_at: string
          document_number: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string | null
          gender: string | null
          id: string
          is_active: boolean
          last_name: string | null
          medical_conditions: string | null
          nationality: string | null
          nif: string | null
          organization_name: string | null
          phone: string | null
          postal_code: string | null
          role: Database["public"]["Enums"]["user_role"]
          street: string | null
          street_number: string | null
          support_email: string | null
          team_captain_name: string | null
          team_description: string | null
          team_name: string | null
          tshirt_size: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          affiliation_code?: string | null
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          cae?: string | null
          city?: string | null
          company_address?: string | null
          company_city?: string | null
          company_nif?: string | null
          company_phone?: string | null
          created_at?: string
          document_number?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          medical_conditions?: string | null
          nationality?: string | null
          nif?: string | null
          organization_name?: string | null
          phone?: string | null
          postal_code?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          street?: string | null
          street_number?: string | null
          support_email?: string | null
          team_captain_name?: string | null
          team_description?: string | null
          team_name?: string | null
          tshirt_size?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          affiliation_code?: string | null
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          cae?: string | null
          city?: string | null
          company_address?: string | null
          company_city?: string | null
          company_nif?: string | null
          company_phone?: string | null
          created_at?: string
          document_number?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          medical_conditions?: string | null
          nationality?: string | null
          nif?: string | null
          organization_name?: string | null
          phone?: string | null
          postal_code?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          street?: string | null
          street_number?: string | null
          support_email?: string | null
          team_captain_name?: string | null
          team_description?: string | null
          team_name?: string | null
          tshirt_size?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
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
          participant_nif: string | null
          participant_phone: string | null
          payment_method: string | null
          payment_status: string
          registration_number: string | null
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          team_name: string | null
          ticket_type_id: string
          ticket_type_name: string | null
          tshirt_size: string | null
          updated_at: string
          user_id: string | null
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
          participant_nif?: string | null
          participant_phone?: string | null
          payment_method?: string | null
          payment_status?: string
          registration_number?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          team_name?: string | null
          ticket_type_id: string
          ticket_type_name?: string | null
          tshirt_size?: string | null
          updated_at?: string
          user_id?: string | null
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
          participant_nif?: string | null
          participant_phone?: string | null
          payment_method?: string | null
          payment_status?: string
          registration_number?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          team_name?: string | null
          ticket_type_id?: string
          ticket_type_name?: string | null
          tshirt_size?: string | null
          updated_at?: string
          user_id?: string | null
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
      security_events: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          risk_score: number
          severity: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          risk_score?: number
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          risk_score?: number
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      team_members: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          joined_at: string
          member_email: string | null
          member_name: string | null
          participant_cc: string | null
          participant_email: string | null
          participant_name: string | null
          role: string
          status: string
          team_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          joined_at?: string
          member_email?: string | null
          member_name?: string | null
          participant_cc?: string | null
          participant_email?: string | null
          participant_name?: string | null
          role?: string
          status?: string
          team_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          joined_at?: string
          member_email?: string | null
          member_name?: string | null
          participant_cc?: string | null
          participant_email?: string | null
          participant_name?: string | null
          role?: string
          status?: string
          team_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          captain_id: string | null
          captain_user_id: string | null
          created_at: string
          description: string | null
          event_id: string | null
          id: string
          is_active: boolean
          is_public: boolean
          location: string | null
          logo_url: string | null
          max_members: number | null
          name: string
          sport_category: string | null
          updated_at: string
        }
        Insert: {
          captain_id?: string | null
          captain_user_id?: string | null
          created_at?: string
          description?: string | null
          event_id?: string | null
          id?: string
          is_active?: boolean
          is_public?: boolean
          location?: string | null
          logo_url?: string | null
          max_members?: number | null
          name: string
          sport_category?: string | null
          updated_at?: string
        }
        Update: {
          captain_id?: string | null
          captain_user_id?: string | null
          created_at?: string
          description?: string | null
          event_id?: string | null
          id?: string
          is_active?: boolean
          is_public?: boolean
          location?: string | null
          logo_url?: string | null
          max_members?: number | null
          name?: string
          sport_category?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
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
      user_feedback: {
        Row: {
          admin_notes: string | null
          browser_info: Json | null
          created_at: string
          description: string
          id: string
          page_url: string | null
          priority: string
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          browser_info?: Json | null
          created_at?: string
          description: string
          id?: string
          page_url?: string | null
          priority?: string
          status?: string
          title: string
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          browser_info?: Json | null
          created_at?: string
          description?: string
          id?: string
          page_url?: string | null
          priority?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_security_event: {
        Args: {
          p_details?: Json
          p_event_type: string
          p_risk_score?: number
          p_user_agent?: string
          p_user_id?: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "organizer" | "participant" | "team"
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
      app_role: ["admin", "organizer", "participant", "team"],
      user_role: ["admin", "organizer", "participant", "team"],
    },
  },
} as const
