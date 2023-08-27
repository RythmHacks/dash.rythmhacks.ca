export interface ScheduleData {
  title: string,
  description?: string,
  startTime: string,
  endTime?: string,
  location: string,
  type: 'mainEvent' | 'meal' | 'workshop' | 'sponsor' | 'activity',
  height: number,
  width: number,
  heightOffset: number
}

export interface EventTypes {
  name: string,
  color: string,
  id: 'mainEvent' | 'meal' | 'workshop' | 'sponsor' | 'activity'
}