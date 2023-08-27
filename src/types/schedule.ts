export interface ScheduleData {
  title: string,
  description?: string,
  startTime: string,
  endTime?: string,
  location: string,
  type: 'mainEvent' | 'meal' | 'workshop' | 'sponsor' | 'activity',
  height: number,
  heightOffset: number
}

