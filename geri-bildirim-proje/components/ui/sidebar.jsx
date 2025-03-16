"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  QrCode, 
  MessageSquare, 
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen border-r bg-background flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-hidden">
          <QrCode className="h-6 w-6 text-primary flex-shrink-0" />
          {!collapsed && <span className="font-bold text-lg">GeriBildirimQR</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/dashboard" 
              className={`flex items-center ${collapsed ? "justify-center" : "space-x-2"} p-2 rounded-md hover:bg-muted transition-colors`}
            >
              <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
              {!collapsed && <span>Gösterge Paneli</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/qr-codes" 
              className={`flex items-center ${collapsed ? "justify-center" : "space-x-2"} p-2 rounded-md hover:bg-muted transition-colors`}
            >
              <QrCode className="h-5 w-5 text-muted-foreground" />
              {!collapsed && <span>QR Kodlarım</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/feedback" 
              className={`flex items-center ${collapsed ? "justify-center" : "space-x-2"} p-2 rounded-md hover:bg-muted transition-colors`}
            >
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              {!collapsed && <span>Geri Bildirimler</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/analytics" 
              className={`flex items-center ${collapsed ? "justify-center" : "space-x-2"} p-2 rounded-md hover:bg-muted transition-colors`}
            >
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              {!collapsed && <span>Analizler</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/users" 
              className={`flex items-center ${collapsed ? "justify-center" : "space-x-2"} p-2 rounded-md hover:bg-muted transition-colors`}
            >
              <Users className="h-5 w-5 text-muted-foreground" />
              {!collapsed && <span>Kullanıcılar</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Link 
          href="/sign-in" 
          className={`flex items-center ${collapsed ? "justify-center" : "space-x-2"} p-2 rounded-md hover:bg-muted transition-colors text-red-500`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Oturumu Kapat</span>}
        </Link>
      </div>
    </div>
  );
} 