"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Calendar, CheckCircle, Eye } from "lucide-react";
import Link from "next/link";

interface CertificateCardProps {
  certificate: {
    id?: string;
    role: string;
    score: number;
    date: string;
    minted: boolean;
  };
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg">SkillForge</h3>
          <p className="text-sm text-muted-foreground">Certificate of Achievement</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <p className="font-semibold">{certificate.role}</p>
          <Badge variant="secondary" className="mt-2">
            Score: {certificate.score}%
          </Badge>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {certificate.date}
        </div>
        
        <div className="flex items-center justify-center gap-2">
          {certificate.minted ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">Minted on Blockchain</span>
            </>
          ) : (
            <Badge variant="outline">Not Minted</Badge>
          )}
        </div>

        {certificate.id && (
          <Link href={`/dashboard/certificates/view/${certificate.id}`} className="block">
            <Button variant="outline" className="w-full mt-2">
              <Eye className="w-4 h-4 mr-2" />
              View Certificate
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
