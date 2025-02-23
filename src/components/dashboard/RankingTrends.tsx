
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface RankingTrendsProps {
  data: {
    weekNumber: number;
    rankings: {
      member: string;
      average_rank: number;
      total_votes: number;
    }[];
  }[];
}

const RankingTrends: React.FC<RankingTrendsProps> = ({ data }) => {
  // Transform data for the line chart
  const transformedData = data.map(week => {
    const rankingData: { [key: string]: any } = { weekNumber: week.weekNumber };
    week.rankings.forEach(ranking => {
      rankingData[ranking.member] = ranking.average_rank;
    });
    return rankingData;
  });

  // Get unique team members
  const teamMembers = Array.from(
    new Set(data.flatMap(week => week.rankings.map(r => r.member)))
  );

  // Generate random colors for each team member
  const colors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000",
    "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#00C49F"
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ranking Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="weekNumber" 
                label={{ value: 'Week Number', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Average Ranking', angle: -90, position: 'insideLeft' }}
                reversed
              />
              <Tooltip />
              <Legend />
              {teamMembers.map((member, index) => (
                <Line
                  key={member}
                  type="monotone"
                  dataKey={member}
                  stroke={colors[index % colors.length]}
                  name={member}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingTrends;
