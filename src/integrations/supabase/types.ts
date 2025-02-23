export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_codes: {
        Row: {
          code: string
          created_at: string | null
          is_active: boolean | null
        }
        Insert: {
          code: string
          created_at?: string | null
          is_active?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string | null
          is_active?: boolean | null
        }
        Relationships: []
      }
      achievements: {
        Row: {
          about_learning: string
          alt_text: string | null
          date: string
          id: number
          image_url: string | null
          issuer: string
          link: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          about_learning: string
          alt_text?: string | null
          date: string
          id?: number
          image_url?: string | null
          issuer: string
          link?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          about_learning?: string
          alt_text?: string | null
          date?: string
          id?: number
          image_url?: string | null
          issuer?: string
          link?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      ai_tools: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          pricing_type: string | null
          tags: string[] | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          image_url?: string | null
          name: string
          pricing_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          image_url?: string | null
          name?: string
          pricing_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      author_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          profile_image_url: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id: string
          profile_image_url?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          profile_image_url?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          draft_content: string | null
          excerpt: string | null
          featured_image: string | null
          font_settings: Json | null
          id: number
          last_autosave_at: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          theme: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author: string
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          draft_content?: string | null
          excerpt?: string | null
          featured_image?: string | null
          font_settings?: Json | null
          id?: number
          last_autosave_at?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          theme?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author?: string
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          draft_content?: string | null
          excerpt?: string | null
          featured_image?: string | null
          font_settings?: Json | null
          id?: number
          last_autosave_at?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          theme?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      book_discussions: {
        Row: {
          author: string | null
          book_id: string
          cover_url: string | null
          created_at: string | null
          created_by: string | null
          id: number
          title: string
        }
        Insert: {
          author?: string | null
          book_id: string
          cover_url?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          title: string
        }
        Update: {
          author?: string | null
          book_id?: string
          cover_url?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      discussion_messages: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: number | null
          id: number
          parent_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id?: number | null
          id?: number
          parent_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: number | null
          id?: number
          parent_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussion_messages_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "book_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "discussion_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          approval_status: string | null
          created_at: string
          display_order: number | null
          email: string | null
          id: number
          idea: string | null
          name: string | null
        }
        Insert: {
          approval_status?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: number
          idea?: string | null
          name?: string | null
        }
        Update: {
          approval_status?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: number
          idea?: string | null
          name?: string | null
        }
        Relationships: []
      }
      learning_resources: {
        Row: {
          author: string | null
          category: string | null
          created_at: string | null
          description: string | null
          external_url: string | null
          featured: boolean | null
          id: number
          status: string | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          external_url?: string | null
          featured?: boolean | null
          id?: number
          status?: string | null
          tags?: string[] | null
          title: string
          type?: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          external_url?: string | null
          featured?: boolean | null
          id?: number
          status?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          published_at: string | null
          title: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          published_at?: string | null
          title: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          published_at?: string | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: number
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_sections: {
        Row: {
          category: string
          created_at: string | null
          display_order: number | null
          icon: string
          id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          display_order?: number | null
          icon: string
          id?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          display_order?: number | null
          icon?: string
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: number
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: number
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: number
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_category"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "project_sections"
            referencedColumns: ["category"]
          },
        ]
      }
      team_feedback: {
        Row: {
          id: string
          responses: Json
          submitted_at: string | null
          user_id: string
          week_number: number
          year: number
        }
        Insert: {
          id?: string
          responses: Json
          submitted_at?: string | null
          user_id: string
          week_number: number
          year: number
        }
        Update: {
          id?: string
          responses?: Json
          submitted_at?: string | null
          user_id?: string
          week_number?: number
          year?: number
        }
        Relationships: []
      }
      un_jobs: {
        Row: {
          created_at: string | null
          id: number
          job_id: string
          job_link: string
          organization: string
          title: string
          update_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          job_id: string
          job_link: string
          organization: string
          title: string
          update_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          job_id?: string
          job_link?: string
          organization?: string
          title?: string
          update_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      visitor_analytics: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          operating_system: string | null
          pathname: string | null
          referrer: string | null
          session_id: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          operating_system?: string | null
          pathname?: string | null
          referrer?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          operating_system?: string | null
          pathname?: string | null
          referrer?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      weekly_rankings_summary: {
        Row: {
          created_at: string | null
          id: string
          summary_data: Json
          week_number: number
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          summary_data: Json
          week_number: number
          year: number
        }
        Update: {
          created_at?: string | null
          id?: string
          summary_data?: Json
          week_number?: number
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_weekly_summary: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_submitted_this_week: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
