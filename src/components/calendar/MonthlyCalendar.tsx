
import React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, getDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "project" | "task" | "meeting" | "other";
  color: string;
}

interface MonthlyCalendarProps {
  currentDate: Date;
  events: Event[];
  onDateChange: (date: Date) => void;
  onDateSelect: (date: Date) => void;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  currentDate,
  events,
  onDateChange,
  onDateSelect,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Create an array for each week row
  const startWeekday = getDay(monthStart); // 0 for Sunday, 1 for Monday, etc.
  
  // Create the grid's rows and columns
  const weeks: Array<Array<Date | null>> = [];
  let week: Array<Date | null> = Array(7).fill(null);
  
  // Fill in the first week with empty cells before the first day of month
  for (let i = 0; i < startWeekday; i++) {
    week[i] = null;
  }
  
  // Fill in the days of the month
  let dayIndex = 0;
  for (let i = startWeekday; i < 7; i++) {
    if (dayIndex < daysInMonth.length) {
      week[i] = daysInMonth[dayIndex++];
    }
  }
  
  weeks.push([...week]);
  
  // Fill in the remaining weeks
  week = Array(7).fill(null);
  let weekIndex = 0;
  
  while (dayIndex < daysInMonth.length) {
    week[weekIndex] = daysInMonth[dayIndex++];
    weekIndex++;
    
    if (weekIndex === 7 || dayIndex === daysInMonth.length) {
      weeks.push([...week]);
      week = Array(7).fill(null);
      weekIndex = 0;
    }
  }

  // Go to previous or next month
  const previousMonth = () => {
    onDateChange(addMonths(currentDate, -1));
  };

  const nextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  // Get events for a particular day
  const getDayEvents = (date: Date | null) => {
    if (!date) return [];
    return events.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-lg shadow-md border">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-bold tracking-tight">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b bg-muted/20">
          {weekDays.map(day => (
            <div 
              key={day} 
              className="text-center py-2 font-medium text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {week.map((day, dayIndex) => {
                const dayEvents = getDayEvents(day);
                const isCurrentMonth = day ? isSameMonth(day, currentDate) : false;
                const isCurrentDay = day ? isToday(day) : false;
                
                return (
                  <div 
                    key={dayIndex} 
                    className={cn(
                      "min-h-[100px] p-1 border border-muted",
                      !day && "bg-muted/10",
                      isCurrentDay && "bg-blue-50",
                      day && "cursor-pointer hover:bg-gray-50"
                    )}
                    onClick={() => day && onDateSelect(day)}
                  >
                    {day && (
                      <>
                        <div className={cn(
                          "text-right p-1",
                          isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                          isCurrentDay && "font-bold text-primary"
                        )}>
                          {format(day, 'd')}
                        </div>
                        
                        <div className="space-y-1 mt-1">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div 
                              key={event.id} 
                              className={cn(
                                "text-xs truncate px-1 py-0.5 rounded-sm",
                                event.color
                              )}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-muted-foreground pl-1">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
