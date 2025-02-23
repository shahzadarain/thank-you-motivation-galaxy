
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import RankingTrends from '@/components/dashboard/RankingTrends';
import RankingSummary from '@/components/dashboard/RankingSummary';
import DateRangeFilter from '@/components/dashboard/DateRangeFilter';
import { subWeeks } from 'date-fns';
import { Json } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

interface RankingData {
  member: string;
  average_rank: number;
  total_votes: number;
}

interface WeeklySummary {
  id: string;
  week_number: number;
  year: number;
  created_at: string;
  summary_data: {
    rankings: RankingData[];
  };
}

interface SupabaseWeeklySummary {
  id: string;
  week_number: number;
  year: number;
  created_at: string;
  summary_data: Json;
}

function isValidSummaryData(data: unknown): data is { rankings: RankingData[] } {
  if (!data || typeof data !== 'object') return false;
  const obj = data as any;
  return Array.isArray(obj.rankings) && 
         obj.rankings.every((r: any) => 
           typeof r === 'object' && 
           typeof r.member === 'string' && 
           typeof r.average_rank === 'number' && 
           typeof r.total_votes === 'number'
         );
}

const Dashboard = () => {
  const [startDate, setStartDate] = useState(subWeeks(new Date(), 4));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const { toast } = useToast();

  const { data: rankingData, isLoading, error } = useQuery<WeeklySummary[]>({
    queryKey: ['rankings', startDate, endDate],
    queryFn: async () => {
      console.log('Fetching rankings data...'); // Debug log
      const { data, error } = await supabase
        .from('weekly_rankings_summary')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase query error:', error); // Debug log
        toast({
          variant: "destructive",
          title: "Error loading dashboard data",
          description: error.message
        });
        throw error;
      }

      console.log('Received data:', data); // Debug log

      // Transform the data to match our WeeklySummary interface
      return (data as SupabaseWeeklySummary[]).map(item => {
        let parsedData: unknown;
        
        if (typeof item.summary_data === 'string') {
          try {
            parsedData = JSON.parse(item.summary_data);
          } catch {
            parsedData = { rankings: [] };
          }
        } else {
          parsedData = item.summary_data;
        }

        return {
          ...item,
          summary_data: isValidSummaryData(parsedData) 
            ? parsedData 
            : { rankings: [] }
        };
      });
    },
  });

  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              There was an error loading the dashboard data. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const teamMembers = Array.from(
    new Set(rankingData?.flatMap(week => 
      (week.summary_data.rankings || []).map(r => r.member)
    ) ?? [])
  );

  const filteredData = rankingData?.map(week => ({
    weekNumber: week.week_number,
    rankings: selectedMember === 'all' 
      ? week.summary_data.rankings
      : week.summary_data.rankings.filter(r => r.member === selectedMember),
  })) ?? [];

  const currentWeekData = rankingData?.[rankingData.length - 1]?.summary_data.rankings ?? [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Rankings Dashboard</h1>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateRangeChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Filter by Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedMember}
              onValueChange={setSelectedMember}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Ranking</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {selectedMember === 'all' 
              ? 'Select a member'
              : currentWeekData.find(r => r.member === selectedMember)?.average_rank.toFixed(2) ?? 'N/A'
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Votes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {selectedMember === 'all'
              ? currentWeekData.reduce((acc, curr) => acc + curr.total_votes, 0)
              : currentWeekData.find(r => r.member === selectedMember)?.total_votes ?? 0
            }
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RankingTrends data={filteredData} />
        <RankingSummary data={currentWeekData} />
      </div>
    </div>
  );
};

export default Dashboard;
