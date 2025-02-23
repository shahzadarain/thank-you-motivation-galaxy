
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface RankingSummaryProps {
  data: {
    member: string;
    average_rank: number;
    total_votes: number;
  }[];
}

const RankingSummary: React.FC<RankingSummaryProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => a.average_rank - b.average_rank);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Current Rankings Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="member" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                label={{ value: 'Average Ranking', angle: -90, position: 'insideLeft' }}
                reversed
              />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="average_rank" 
                fill="#8884d8" 
                name="Average Ranking"
              />
              <Bar 
                dataKey="total_votes" 
                fill="#82ca9d" 
                name="Total Votes"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingSummary;
