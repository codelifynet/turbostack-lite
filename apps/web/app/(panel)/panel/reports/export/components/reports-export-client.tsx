"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/shadcn-ui/ui/card";
import { Button } from "@repo/shadcn-ui/ui/button";
import { Label } from "@repo/shadcn-ui/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/ui/select";
import { Checkbox } from "@repo/shadcn-ui/ui/checkbox";
import { 
  Download, 
  FileText,
  FileSpreadsheet,
  FileJson,
  Calendar,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const exportFormats = [
  { value: "pdf", label: "PDF Document", icon: FileText, description: "Formatted document" },
  { value: "csv", label: "CSV File", icon: FileSpreadsheet, description: "Comma-separated values" },
  { value: "xlsx", label: "Excel Spreadsheet", icon: FileSpreadsheet, description: "Microsoft Excel format" },
  { value: "json", label: "JSON Data", icon: FileJson, description: "Raw JSON format" },
];

const dataTypes = [
  { id: "users", label: "User Data", description: "User accounts and activity" },
  { id: "orders", label: "Orders", description: "Order history and details" },
  { id: "revenue", label: "Revenue", description: "Financial data and transactions" },
  { id: "analytics", label: "Analytics", description: "Traffic and engagement metrics" },
  { id: "reports", label: "Reports", description: "Generated reports" },
];

const dateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
  { value: "all", label: "All time" },
];

export function ReportsExportClient() {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedDateRange, setSelectedDateRange] = useState("30d");
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>(["users", "orders"]);
  const [isExporting, setIsExporting] = useState(false);

  const handleDataTypeToggle = (typeId: string) => {
    setSelectedDataTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleExport = async () => {
    if (selectedDataTypes.length === 0) {
      toast.error("Please select at least one data type to export");
      return;
    }

    setIsExporting(true);
    
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    toast.success(`Successfully exported data as ${selectedFormat.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Export Reports
              </h1>
              <p className="text-muted-foreground text-sm">
                Download your data in various formats
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Format Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Export Format</CardTitle>
              <CardDescription>Choose the format for your exported data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {exportFormats.map((format) => {
                  const Icon = format.icon;
                  return (
                    <button
                      key={format.value}
                      onClick={() => setSelectedFormat(format.value)}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border-2 transition-colors text-left",
                        selectedFormat === format.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg",
                        selectedFormat === format.value
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {format.description}
                        </div>
                      </div>
                      {selectedFormat === format.value && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Data Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Data to Export</CardTitle>
              <CardDescription>Select the types of data you want to include</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataTypes.map((type) => (
                  <div key={type.id} className="flex items-start gap-3">
                    <Checkbox
                      id={type.id}
                      checked={selectedDataTypes.includes(type.id)}
                      onCheckedChange={() => handleDataTypeToggle(type.id)}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={type.id}
                        className="font-medium cursor-pointer"
                      >
                        {type.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
              <CardDescription>Choose the time period for your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Time Period</Label>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary & Export */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Summary</CardTitle>
              <CardDescription>Review your export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Format</div>
                <div className="font-medium">
                  {exportFormats.find(f => f.value === selectedFormat)?.label}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Date Range</div>
                <div className="font-medium">
                  {dateRanges.find(r => r.value === selectedDateRange)?.label}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Data Types</div>
                <div className="font-medium">
                  {selectedDataTypes.length > 0 
                    ? `${selectedDataTypes.length} selected`
                    : "None selected"
                  }
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={handleExport}
                disabled={isExporting || selectedDataTypes.length === 0}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>Your export history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Users Report", date: "2 hours ago", format: "PDF" },
                  { name: "Analytics Data", date: "1 day ago", format: "CSV" },
                  { name: "Revenue Report", date: "3 days ago", format: "XLSX" },
                ].map((export_, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">{export_.name}</div>
                      <div className="text-muted-foreground text-xs">{export_.date}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
