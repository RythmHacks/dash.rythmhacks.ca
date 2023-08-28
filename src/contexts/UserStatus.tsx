import { createContext, PropsWithChildren, useEffect, useState, useContext } from 'react';
import { useAuth } from './Auth'

const StatusContext = createContext<string>('')

export const StatusProvider = ({ children }: PropsWithChildren<{}>) => {

  const { supabase, user } = useAuth()

  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    console.log('used effect')
    supabase.from('hacker_registrations').select('*').eq('id', user?.id)
      .then(({ data, error }: { data: any, error: any }) => {
        const fetchedStatus = data?.[0]?.status
        if (!error && fetchedStatus) {
          setStatus(fetchedStatus)
        }
      })
  }, [supabase, user?.id])

  return <StatusContext.Provider value={status}>{children}</StatusContext.Provider>
}

export const useStatus = () => {
  const statusContext = useContext(StatusContext);
  if (!statusContext) {
      throw new Error("useStatus must be used within <StatusContext.Provider>")
  }
  return statusContext;
};
