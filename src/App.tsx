import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { arrayDataIsVerified } from "./utils";

interface MissionsData {
  id: string;
  name: string;
  wikipedia: string;
  description: string;
}

interface MissionsResult {
  missions: Array<MissionsData>;
}

const MISSIONS = gql`
  query GetMissions {
    missions {
      id
      name
      wikipedia
      description
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery<MissionsResult>(MISSIONS);
  const [missions, setMissions] = useState(data?.missions);

  const getMissions = () => {
    setMissions(data?.missions);
  }

  useEffect(() => {
    getMissions();
  }, [getMissions]);

  useEffect(() => {
    setMissions(missions)
  }, [missions])
  
  const handleAlphabetizedSort = (arr: any) => {
    if (!arrayDataIsVerified(arr)) return;

    const missionsSortedAlphabeticallyByName = [...arr].sort((a: any, b: any) => {
      return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
    });

    setMissions(missionsSortedAlphabeticallyByName);
  }

  const handleLocationBasedFilter = (arr: any) => {
    if (!arrayDataIsVerified(arr)) return;

    const keyword = "European";
    const missionsFilteredByCoverageArea = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].description.includes(keyword)) {
        missionsFilteredByCoverageArea.push(arr[i]);
      }
    }

    setMissions(missionsFilteredByCoverageArea);
  }

  return (
    <>
      <header>
        <h1>SpaceX Missions</h1>
        {missions && (
          <div className="button-group">
            <button type="button" onClick={() => handleLocationBasedFilter(missions)}>Filter by (European) coverage area</button>
            <button type="button" onClick={() => handleAlphabetizedSort(missions)}>Sort alphabetically by mission name</button>
            <button type="button" onClick={() => getMissions()}>Reset Missions!</button>
          </div>
        )}
      </header>
      {error && (
        <div className="error-messaging">
          Something went wrong ... Check back again soon!
        </div>
      )}
      {loading || !missions ? (<p>Loading...</p>) :
        missions.map(mission => (
          <div key={mission.id}>
            <h2><a href={mission.wikipedia}>{mission.name}</a></h2>
            <p><b>Description</b>: {mission.description}</p>
            <p><b>Wikipedia</b>: <a href={mission.wikipedia}>{mission.wikipedia}</a></p>
          </div>
        ))
      }
    </>
  );
}

export default App;
