
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReportTypeInfo {
  name: string;
  presentationType: string;
}

interface StatusInfo {
  name: string;
  colorScheme: string;
}

interface Report {
  id: string;
  title: string;
  clientName: string;
  generatedAt: Date;
  status: string;
  aiModel: string;
  type: string;
}

interface ReportsListViewProps {
  reports: Report[];
  getStatusBadgeClasses: (statusName: string) => string;
  getStatusLabel: (statusName: string) => string;
  getPresentationType: (typeName: string) => string;
  getPresentationTypeBadgeClasses: (presentationType: string) => string;
}

const ReportsListView = ({
  reports,
  getStatusBadgeClasses,
  getStatusLabel,
  getPresentationType,
  getPresentationTypeBadgeClasses,
}: ReportsListViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Generated</TableHead>
            <TableHead>AI Model</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.title}</TableCell>
              <TableCell>{report.clientName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{report.type}</span>
                  <span className={`rounded-full px-2 py-1 text-xs ${getPresentationTypeBadgeClasses(getPresentationType(report.type))}`}>
                    {getPresentationType(report.type)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClasses(report.status)}`}>
                  {getStatusLabel(report.status)}
                </span>
              </TableCell>
              <TableCell>{report.generatedAt.toLocaleDateString()}</TableCell>
              <TableCell>{report.aiModel}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {reports.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-medium">No reports found</p>
                  <p className="text-muted-foreground">Try adjusting your search filters or generate a new report</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportsListView;
