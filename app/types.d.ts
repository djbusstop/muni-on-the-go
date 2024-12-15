enum Direction {
  "IB" = "inbound",
  "OB" = "outbound",
}

interface Location {
  Longitude: string; // '-122.393593'
  Latitude: string; // '37.794693'
}
// Stop Visits

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
  DirectionRef: Direction;
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

interface MonitoredVehicleJourney<MonitoredCallType = MonitoredCall | undefined>
  extends BaseVehicleJourney {
  FramedVehicleJourneyRef: {
    DataFrameRef: string; // '2024-07-29'
    DatedVehicleJourneyRef: string; // '11618992_M31'
  };
  Monitored: boolean;
  InCongestion: null; // Not sure other values
  VehicleLocation: Location;
  Bearing: string; // '135.0000000000'
  Occupancy: "seatsAvailable";
  VehicleRef: string; // '1010'
  MonitoredCall: MonitoredCallType;
  OnwardCalls?: {
    OnwardCall: Array<OnwardCall>;
  };
}

// Responses

interface ScheduledDeparturesResponse {
  Siri: {
    ServiceDelivery: {
      ResponseTimestamp: string; // "2024-12-09T12:07:31-08:00";
      Status: boolean;
      StopTimetableDelivery: {
        ResponseTimestamp: string; // "2024-12-09T12:07:31-08:00";
        TimetabledStopVisit: Array<{
          RecordedAtTime: string; // "2024-10-25T21:03:46-08:00";
          MonitoringRef: string; // "16754";
          TargetedVehicleJourney: TargetedVehicleJourney;
        }>;
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
        VehicleActivity: Array<{
          RecordedAtTime: string; // '2024-07-29T18:15:56Z'
          ValidUntilTime: string; // '' | '2024-07-29T18:15:56Z'
          MonitoredVehicleJourney: MonitoredVehicleJourney;
        }>;
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
      version: string; // "1.4";
      MonitoredStopVisit: Array<{
        RecordedAtTime: "2024-12-07T12:58:48Z";
        MonitoringRef: "14229";
        // With required MonitoredCall
        MonitoredVehicleJourney: MonitoredVehicleJourney<MonitoredCall>;
      }>;
    };
  };
}

// Stop Places

interface StopPlace {
  "@version": string; // "any";
  "@id": string; // "15551";
  ValidBetween: {
    FromDate: string; // "2024-10-26T00:00:00-08:00";
    ToDate: string; // "2025-01-10T23:59:00-08:00";
  };
  Name: string; // "Mission St & 16th St";
  Description: unknown; // Probably string?;
  Centroid: {
    Location: Location;
  };
  AccessibilityAssessment: {
    "@version": string; // "any";
    "@id": string; // "15551";
    MobilityImpairedAccess: string; // "unknown";
    limitations: {
      AccessibilityLimitation: {
        WheelchairAccess: string; // "unknown";
      };
    };
  };
  PostalAddress: {
    AddressLine1: string; // "Mission St & 16th St";
    Town: string; // "San Francisco";
  };
  Url: string; // "https://www.sfmta.com/15551";
  OperatorRef: {
    "@ref": "SF";
  };
  adjacentSites: {
    ParkingRef: {
      "@ref": string; // "";
    };
  };
  PublicCode: string; // "15551";
  TransportMode: string; // "bus";
  StopPlaceType: "onstreetBus" | string;
}

interface StopPlacesResponse {
  Siri: {
    ServiceDelivery: {
      ResponseTimestamp: string; // "2024-12-12T03:07:59-08:00";
      DataObjectDelivery: {
        ResponseTimestamp: "2024-12-12T03:07:59-08:00";
        dataObjects: {
          SiteFrame: {
            "@version": string; // "any";
            "@id": "SF";
            stopPlaces: {
              // When only one stop. Will be array if multiple stops.
              StopPlace: StopPlace;
            };
            parkings: unknown;
          };
        };
      };
    };
  };
}

// Stops

interface ScheduledStopPoint {
  id: string; // "15829";
  Extensions: {
    LocationType: string | null;
    PlatformCode: string | null;
    ParentStation: unknown | null; // never seen a value here
    ValidBetween: {
      FromDate: string; // "2024-10-26T00:00:00-08:00";
      ToDate: string; // "2025-01-10T23:59:00-08:00";
    };
  };
  Name: string; // "100 O'Shaughnessy Blvd";
  Location: Location;
  Url: string; // "https://www.sfmta.com/15829";
  StopType: "onstreetBus" | string;
}

interface StopsResponse {
  Contents: {
    ResponseTimestamp: string; // "2024-12-12T04:17:33-08:00";
    dataObjects: {
      id: string; // "SF";
      ScheduledStopPoint: ScheduledStopPoint[];
    };
  };
}
