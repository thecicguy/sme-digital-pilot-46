
import { CheckCircle, Clock, AlertCircle, PauseCircle } from "lucide-react";
import React from "react";

export const statusIcons = {
  "doing": <Clock className="h-4 w-4 text-crm-blue" />,
  "done": <CheckCircle className="h-4 w-4 text-green-500" />,
  "for_review": <AlertCircle className="h-4 w-4 text-amber-500" />,
  "deferred": <PauseCircle className="h-4 w-4 text-gray-500" />
};

export const statusLabels = {
  "doing": "In Progress",
  "done": "Completed", 
  "for_review": "For Review",
  "deferred": "Deferred"
};
