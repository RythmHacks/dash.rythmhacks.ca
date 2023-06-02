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
        Relationships: []
      }
      hacker_applications: {
        Row: {
          age: string
          country: string | null
          email: string
          gender: string
          grade: string
          id: string
          phone_number: string
          question_1: string
          question_2: string
          school: string
          status: string
        }
        Insert: {
          age?: string
          country?: string | null
          email: string
          gender?: string
          grade?: string
          id: string
          phone_number?: string
          question_1?: string
          question_2?: string
          school?: string
          status?: string
        }
        Update: {
          age?: string
          country?: string | null
          email?: string
          gender?: string
          grade?: string
          id?: string
          phone_number?: string
          question_1?: string
          question_2?: string
          school?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "hacker_applications_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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

