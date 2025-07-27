import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Corona } from '../../type/Corona.type';
import { Vaccination } from '../../type/Vaccination.type';
import { Member } from '../../type/Member.type';
import { Pie } from "react-chartjs-2";

const SummaryView: React.FC = () => {
  const [coronaData, setCoronaData] = useState<Corona[]>([]);
  const [nonVaccinatedMembers, setNonVaccinatedMembers] = useState<number[]>([]);
  const[allMembers,setAllMembers]=useState<Member[]>([])
  useEffect(() => {
    const fetchCoronaData = async () => {
      try {
        const response = await fetch('https://localhost:7258/GetAllCoronas');
        const coronaData = await response.json();
        setCoronaData(coronaData);
      } catch (error) {
        console.error('Error fetching corona data:', error);
      }
    };

    const fetchVaccinationData = async () => {
      try {
        const response = await fetch('https://localhost:7258/GetAllVaccinations');
        const vaccinationData = await response.json();
        const vaccinatedMembers = vaccinationData.map((data: Vaccination) => data.memberId);
        // Find non-vaccinated members by comparing all member IDs with vaccinated member IDs
        const allMembersResponse = await fetch('https://localhost:7258/GetAllMembers');
        const MembersData = await allMembersResponse.json();
        setAllMembers([...MembersData])
        const allMemberIds = MembersData.map((member: { memberId: number }) => member.memberId);
        const nonVaccinatedMemberIds = allMemberIds.filter((id:number) => !vaccinatedMembers.includes(id));
        setNonVaccinatedMembers(nonVaccinatedMemberIds);
      } catch (error) {
        console.error('Error fetching vaccination data:', error);
      }
    };

    fetchCoronaData();
    fetchVaccinationData();
  }, []);

  const renderGraph = () => {
    // Process corona data to count patients each day
    const coronaCountMap = new Map<string, number>();
    coronaData.forEach(entry => {
      const date = new Date(entry.positiveDate).toISOString().slice(0, 10); // Extract date part
      if (coronaCountMap.has(date)) {
        coronaCountMap.set(date, coronaCountMap.get(date)! + 1);
      } else {
        coronaCountMap.set(date, 1);
      }
    });

    // Sort the map by date
    const sortedCoronaCount = Array.from(coronaCountMap.entries()).sort((a, b) => {
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });

    // Extract dates and patient counts for the graph
    const dates = sortedCoronaCount.map(entry => entry[0]);
    const patientCounts = sortedCoronaCount.map(entry => entry[1]);

    return (
      <Plot
        data={[
          {
            x: dates,
            y: patientCounts,
            type: 'bar',
            marker: { color: 'rgb(55, 83, 109)' }
          }
        ]}
        layout={{
          title: 'Corona Patients Each Day',
          xaxis: { title: 'Date' },
          yaxis: { title: 'Patient Count' }
        }}
      />
    );
  };

  const getPie = () => {
    return (
      <Plot
        data={[
          {
            x: ['Vaccinated', 'Unvaccinated'],
            y: [allMembers.length, nonVaccinatedMembers.length],
            type: 'bar',
            marker: { color: 'rgb(100, 83, 109)' }
          }
        ]}
        layout={{
          title: 'Corona Patients Each Day',
        }}
      />
    );
  };
  
  return (
    <div>
      <h2>Corona Patients Each Day</h2>
      {renderGraph()}
      <h2>Non-Vaccinated Members</h2>
      <ul>
        {nonVaccinatedMembers.map(memberId => (
          <li key={memberId}>Member ID: {memberId}</li>
        ))}
      </ul>
      <div>{getPie()}</div>
      
      
    </div>
  );
};

export default SummaryView;
