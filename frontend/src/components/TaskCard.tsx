
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Calendar, Flag, CheckSquare } from "lucide-react";

interface JiraTask {
  key: string;
  summary: string;
  description: string;
  acceptanceCriteria: string[];
  status: string;
  assignee: string;
  priority: string;
}

interface TaskCardProps {
  task: JiraTask;
}

export function TaskCard({ task }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{task.key}</CardTitle>
            <h3 className="text-lg font-medium text-indigo-100 mt-1">
              {task.summary}
            </h3>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={getPriorityColor(task.priority)}>
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
            <Badge className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Assignee */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-indigo-100 text-indigo-700">
                {task.assignee.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-800">Asignado a</p>
              <p className="text-slate-600">{task.assignee}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Descripción 2
            </h4>
            <p className="text-slate-600 leading-relaxed">{task.description}</p>
          </div>

          {/* Acceptance Criteria */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
              <CheckSquare className="w-4 h-4 mr-2" />
              Criterios de Aceptación ({task.acceptanceCriteria.length})
            </h4>
            <div className="space-y-2">
              {task.acceptanceCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border-l-4 border-indigo-400">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 flex-1">{criteria}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
