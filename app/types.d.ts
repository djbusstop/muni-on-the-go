interface OnwardCall {
  StopPointRef: string // "16847",
  StopPointName: string // "Visitacion Ave & Bay Shore Blvd",
  DestinationDisplay: string // "City College",
  AimedArrivalTime: string // "2024-07-29T18:28:31Z",
  ExpectedArrivalTime: string | null // "2024-07-29T18:21:29Z",
  AimedDepartureTime: string // "2024-07-29T18:28:31Z",
  ExpectedDepartureTime: string | null
}

interface MonitoredCall extends OnwardCall {
  VehicleLocationAtStop: string // ''
  VehicleAtStop: string // ''
}

interface MonitoredVehicleJourney {
  LineRef: string
  DirectionRef: 'OB' | 'IB' // Any others?
  FramedVehicleJourneyRef: {
    DataFrameRef: string // '2024-07-29'
    DatedVehicleJourneyRef: string // '11618992_M31'
  }
  PublishedLineName: string // 'MARKET & WHARVES'
  OperatorRef: 'SF'
  OriginRef: string // '15184' Stop ID
  OriginName: string // 'Jones St & Beach St'
  DestinationRef: string // '13311' Stop ID
  DestinationName: string // '17th St & Castro St'
  Monitored: boolean
  InCongestion: null // Not sure other values
  VehicleLocation: {
    Longitude: string // '-122.393593'
    Latitude: string // '37.794693'
  }
  Bearing: string // '135.0000000000'
  Occupancy: 'seatsAvailable'
  VehicleRef: string // '1010'
  MonitoredCall?: MonitoredCall
  OnwardCalls?: {
    OnwardCall: Array<OnwardCall>
  }
}

interface VehicleActivity {
  RecordedAtTime: string // '2024-07-29T18:15:56Z'
  ValidUntilTime: string // '' | '2024-07-29T18:15:56Z'
  MonitoredVehicleJourney: MonitoredVehicleJourney
}

interface LiveVehicleMonitoringResponse {
  Siri: {
    ServiceDelivery: {
      ResponseTimestamp: string //"2024-07-29T18:15:56Z"
      ProducerRef: 'SF'
      Status: boolean
      VehicleMonitoringDelivery: {
        version: string // 1.4
        ResponseTimestamp: string // '2024-07-29T18:15:56Z'
        VehicleActivity: Array<VehicleActivity>
      }
    }
  }
}

interface LiveStopMonitoringResponse {
  ServiceDelivery: {
    ResponseTimestamp: string //"2024-07-29T18:15:56Z"
    ProducerRef: 'SF'
    Status: boolean
    StopMonitoringDelivery: {
      ResponseTimestamp: string
      Status: true
      version: '1.4'
      MonitoredStopVisit: [
        {
          RecordedAtTime: '2024-12-07T12:58:48Z'
          MonitoringRef: '14229'
          MonitoredVehicleJourney: MonitoredVehicleJourney
        },
      ]
    }
  }
}
