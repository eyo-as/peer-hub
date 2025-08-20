"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Flag, Eye, Check, X, AlertTriangle } from "lucide-react"

// Mock reports data
const mockReports = [
  {
    id: "1",
    type: "question",
    title: "Inappropriate language in question about chemistry",
    reporter: {
      name: "John D.",
      avatar: "/student-avatar.png",
    },
    reported: {
      name: "Mike R.",
      avatar: "/student-avatar.png",
    },
    reason: "Inappropriate content",
    timeAgo: "2 hours ago",
    status: "pending",
    severity: "medium",
  },
  {
    id: "2",
    type: "answer",
    title: "Spam answer with external links",
    reporter: {
      name: "Sarah M.",
      avatar: "/student-avatar.png",
    },
    reported: {
      name: "Alex K.",
      avatar: "/student-avatar.png",
    },
    reason: "Spam",
    timeAgo: "4 hours ago",
    status: "pending",
    severity: "high",
  },
  {
    id: "3",
    type: "user",
    title: "User harassment in comments",
    reporter: {
      name: "Emma L.",
      avatar: "/student-avatar.png",
    },
    reported: {
      name: "Tom W.",
      avatar: "/student-avatar.png",
    },
    reason: "Harassment",
    timeAgo: "6 hours ago",
    status: "pending",
    severity: "high",
  },
]

export function RecentReports() {
  const [reports, setReports] = useState(mockReports)

  const handleReportAction = (reportId: string, action: "approve" | "dismiss") => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: action === "approve" ? "resolved" : "dismissed" } : report,
      ),
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return AlertTriangle
      case "medium":
        return Flag
      case "low":
        return Flag
      default:
        return Flag
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Pending Reports ({reports.filter((r) => r.status === "pending").length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports
            .filter((report) => report.status === "pending")
            .map((report) => {
              const SeverityIcon = getSeverityIcon(report.severity)
              return (
                <div key={report.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getSeverityColor(report.severity) as any} className="text-xs">
                          <SeverityIcon className="w-3 h-3 mr-1" />
                          {report.severity} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-foreground mb-2">{report.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">Reason: {report.reason}</p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Reported by:</span>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={report.reporter.avatar || "/placeholder.svg"}
                                alt={report.reporter.name}
                              />
                              <AvatarFallback className="text-xs">
                                {report.reporter.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{report.reporter.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Against:</span>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={report.reported.avatar || "/placeholder.svg"}
                                alt={report.reported.name}
                              />
                              <AvatarFallback className="text-xs">
                                {report.reported.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{report.reported.name}</span>
                          </div>
                        </div>
                        <span className="text-muted-foreground">{report.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View Content
                    </Button>
                    <Button size="sm" onClick={() => handleReportAction(report.id, "approve")}>
                      <Check className="w-4 h-4 mr-1" />
                      Take Action
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReportAction(report.id, "dismiss")}>
                      <X className="w-4 h-4 mr-1" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              )
            })}

          {reports.filter((r) => r.status === "pending").length === 0 && (
            <div className="text-center py-8">
              <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No pending reports</h3>
              <p className="text-muted-foreground">All reports have been reviewed and resolved.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
