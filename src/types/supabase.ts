export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      faq: {
        Row: {
          id: string
          timesAsked: number | null
        }
        Insert: {
          id: string
          timesAsked?: number | null
        }
        Update: {
          id?: string
          timesAsked?: number | null
        }
      }
      hacker_applications: {
        Row: {
          address: string | null
          age: string | null
          apartment_suite: string | null
          city: string | null
          country: string | null
          dietary_restrictions_dairy_free: boolean | null
          dietary_restrictions_gluten_free: boolean | null
          dietary_restrictions_halal: boolean | null
          dietary_restrictions_other: string | null
          dietary_restrictions_vegetarian: boolean | null
          email: string | null
          gender: string | null
          grade: string | null
          id: string
          phone_number: string | null
          postal_code: string | null
          province: string | null
          question_1: string | null
          question_2: string | null
          school: string | null
          t_shirt_size: string | null
        }
        Insert: {
          address?: string | null
          age?: string | null
          apartment_suite?: string | null
          city?: string | null
          country?: string | null
          dietary_restrictions_dairy_free?: boolean | null
          dietary_restrictions_gluten_free?: boolean | null
          dietary_restrictions_halal?: boolean | null
          dietary_restrictions_other?: string | null
          dietary_restrictions_vegetarian?: boolean | null
          email?: string | null
          gender?: string | null
          grade?: string | null
          id: string
          phone_number?: string | null
          postal_code?: string | null
          province?: string | null
          question_1?: string | null
          question_2?: string | null
          school?: string | null
          t_shirt_size?: string | null
        }
        Update: {
          address?: string | null
          age?: string | null
          apartment_suite?: string | null
          city?: string | null
          country?: string | null
          dietary_restrictions_dairy_free?: boolean | null
          dietary_restrictions_gluten_free?: boolean | null
          dietary_restrictions_halal?: boolean | null
          dietary_restrictions_other?: string | null
          dietary_restrictions_vegetarian?: boolean | null
          email?: string | null
          gender?: string | null
          grade?: string | null
          id?: string
          phone_number?: string | null
          postal_code?: string | null
          province?: string | null
          question_1?: string | null
          question_2?: string | null
          school?: string | null
          t_shirt_size?: string | null
        }
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
      "starboard-msgs": {
        Row: {
          id: string
          "starboard-message-id": string
        }
        Insert: {
          id: string
          "starboard-message-id": string
        }
        Update: {
          id?: string
          "starboard-message-id"?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
