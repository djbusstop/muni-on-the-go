// Stops

interface TargetedCall {
  StopPointRef: string; // "16847",
  StopPointName: string; // "Visitacion Ave & Bay Shore Blvd",
  DestinationDisplay: string; // "City College",
  AimedArrivalTime: string; // "2024-07-29T18:28:31Z",
  ExpectedArrivalTime: string | null; // "2024-07-29T18:21:29Z",
  AimedDepartureTime: string; // "2024-07-29T18:28:31Z",
  ExpectedDepartureTime: string | null;
}

interface OnwardCall extends TargetedCall {
  ExpectedArrivalTime: string | null; // "2024-07-29T18:21:29Z",
  ExpectedDepartureTime: string | null;
}

interface MonitoredCall extends OnwardCall {
  VehicleLocationAtStop: string; // ''
  VehicleAtStop: string; // ''
}

// Journeys

interface BaseVehicleJourney {
  LineRef: string; // "45";
  DirectionRef: "OB" | "IB" | string;
  DatedVehicleJourneyRef: string; // "11665786_M11";
  PublishedLineName: string; // "45";
  OperatorRef: "SF";
  OriginRef: string; // "18110";
  OriginName: string; // "Townsend St & Lusk St";
  DestinationRef: string; // "15331";
  DestinationName: string; // "Lyon St & Greenwich St";
}

interface TargetedVehicleJourney extends BaseVehicleJourney {
  VehicleJourneyName: string; // "Lyon + Greenwich";
  TargetedCall: TargetedCall;
}

interface MonitoredVehicleJourney extends TargetedVehicleJourney {
  FramedVehicleJourneyRef: {
    DataFrameRef: string; // '2024-07-29'
    DatedVehicleJourneyRef: string; // '11618992_M31'
  };
  Monitored: boolean;
  InCongestion: null; // Not sure other values
  VehicleLocation: {
    Longitude: string; // '-122.393593'
    Latitude: string; // '37.794693'
  };
  Bearing: string; // '135.0000000000'
  Occupancy: "seatsAvailable";
  VehicleRef: string; // '1010'
  MonitoredCall?: MonitoredCall;
  OnwardCalls?: {
    OnwardCall: Array<OnwardCall>;
  };
}

interface VehicleActivity {
  RecordedAtTime: string; // '2024-07-29T18:15:56Z'
  ValidUntilTime: string; // '' | '2024-07-29T18:15:56Z'
  MonitoredVehicleJourney: MonitoredVehicleJourney;
}

// Responses

interface ScheduledDeparturesResponse {
  Siri: {
    ServiceDelivery: {
      ResponseTimestamp: string; // "2024-12-09T12:07:31-08:00";
      Status: boolean;
      StopTimetableDelivery: {
        ResponseTimestamp: string; // "2024-12-09T12:07:31-08:00";
        TimetabledStopVisit: [
          {
            RecordedAtTime: string; // "2024-10-25T21:03:46-08:00";
            MonitoringRef: string; // "16754";
            TargetedVehicleJourney: TargetedVehicleJourney;
          }
        ];
      };
    };
  };
}

interface LiveVehicleMonitoringResponse {
  Siri: {
    ServiceDelivery: {
      ResponseTimestamp: string; //"2024-07-29T18:15:56Z"
      ProducerRef: "SF";
      Status: boolean;
      VehicleMonitoringDelivery: {
        version: string; // 1.4
        ResponseTimestamp: string; // '2024-07-29T18:15:56Z'
        VehicleActivity: Array<VehicleActivity>;
      };
    };
  };
}

interface LiveStopMonitoringResponse {
  ServiceDelivery: {
    ResponseTimestamp: string; //"2024-07-29T18:15:56Z"
    ProducerRef: "SF";
    Status: boolean;
    StopMonitoringDelivery: {
      ResponseTimestamp: string;
      Status: true;
      version: "1.4";
      MonitoredStopVisit: Array<{
        RecordedAtTime: "2024-12-07T12:58:48Z";
        MonitoringRef: "14229";
        MonitoredVehicleJourney: MonitoredVehicleJourney;
      }>;
    };
  };
}
