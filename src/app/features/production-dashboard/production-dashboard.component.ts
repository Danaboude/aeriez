import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { LaneStatusComponent } from './components/lane-status/lane-status.component';

@Component({
  selector: 'app-production-dashboard',
  standalone: true,
  imports: [CommonModule, StatusCardComponent, LaneStatusComponent],
  template: `
    <div class="min-h-screen md:h-screen bg-slate-50 pt-20 pb-4 px-4 md:px-8 font-sans flex flex-col md:overflow-hidden">
      
      <!-- Top Header Area
      <div class="max-w-7xl mx-auto w-full mb-4 animate-fade-in-down shrink-0">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-2">
          <div class="w-full md:w-auto flex justify-between md:block items-center">
            <div>
              <div class="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                <span>Home</span>
                <span>/</span>
                <span>Dashboard</span>
                <span>/</span>
                <span class="text-primary-600">Productie</span>
              </div>
              <h1 class="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">PRODUCTIE</h1>
            </div> -->
            <!-- Mobile Menu Toggle could go here if needed -->
          <!-- </div>
          
          <div class="w-full md:w-auto flex items-center justify-between gap-4 text-slate-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
            <div class="flex flex-col items-center">
               <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Current</span>
               <span class="text-lg font-bold font-mono">14:27</span>
            </div>
            <div class="h-6 w-px bg-slate-200"></div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-medium">Every 1 min</span>
              <button class="text-primary-500 hover:text-primary-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div> -->

        <!-- Main Dashboard Grid -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 flex flex-col h-auto md:h-[calc(100vh-160px)]">
          
          <!-- Dashboard Header Stats -->
          <div class="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/50 shrink-0">
            <div class="p-3 text-center group hover:bg-white transition-colors">
              <span class="text-xl md:text-2xl font-black text-slate-800 block group-hover:scale-110 transition-transform duration-300">0/20</span>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</span>
            </div>
            <div class="p-3 text-center group hover:bg-white transition-colors">
              <span class="text-lg md:text-xl font-bold text-slate-800 block break-words">28 11 25 <br class="md:hidden"> 14:28</span>
              <span class="text-sm font-semibold text-primary-600">0/1</span>
            </div>
            <div class="p-3 text-center group hover:bg-white transition-colors">
              <span class="text-xl md:text-2xl font-black text-rose-500 block group-hover:scale-110 transition-transform duration-300">0</span>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alerts</span>
            </div>
          </div>

          <!-- Column Headers -->
          <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50 font-bold text-slate-600 text-center text-sm uppercase tracking-wider shrink-0 hidden md:grid">
            <div class="py-2">L1</div>
            <div class="py-2">L2</div>
            <div class="py-2">L3</div>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 flex-1 min-h-0">
            
            <!-- Column 1: Status Cards -->
            <div class="p-2 gap-2 bg-slate-50/30 flex flex-col md:h-full md:overflow-hidden h-auto">
               <div class="md:hidden text-center font-bold text-slate-500 text-xs uppercase py-1">L1 Status</div>
              <div class="flex-1 md:min-h-0 h-[100px] md:h-auto">
                <app-status-card type="SC"     [status]="1" [count1]="0" [count2]="3" [count3]="0" timestamp="12 05 25 16:31"></app-status-card>
              </div>
              <div class="flex-1 md:min-h-0 h-[100px] md:h-auto">
                <app-status-card type="QI"     [status]="2" [count1]="0" [count2]="13" [count3]="1" timestamp="22 05 25 09:37"></app-status-card>
              </div>
              <div class="flex-1 md:min-h-0 h-[100px] md:h-auto">
                <app-status-card type="AU KAR" [status]="1" [count1]="0" [count2]="3" [count3]="3" timestamp="13 03 25 13:34"></app-status-card>
              </div>
              <div class="flex-1 md:min-h-0 h-[100px] md:h-auto">
                <app-status-card type="SAFE"   [status]="1" [count1]="0" [count2]="1" [count3]="0" timestamp="25 03 25 09:13"></app-status-card>
              </div>
            </div>

            <!-- Column 2: Large OK Status -->
            <div class="p-2 bg-slate-50/30 flex flex-col md:h-full min-h-0 h-[200px]">
               <div class="md:hidden text-center font-bold text-slate-500 text-xs uppercase py-1">L2 Status</div>
              <app-lane-status status="OK" class="h-full w-full block"></app-lane-status>
            </div>

            <!-- Column 3: Large OK Status -->
            <div class="p-2 bg-slate-50/30 flex flex-col md:h-full min-h-0 h-[200px]">
               <div class="md:hidden text-center font-bold text-slate-500 text-xs uppercase py-1">L3 Status</div>
              <app-lane-status status="OK" class="h-full w-full block"></app-lane-status>
            </div>
          </div>

          <!-- Legend Footer -->
          <div class="border-t border-slate-100 p-3 shrink-0 flex flex-wrap justify-center gap-4 md:gap-12 bg-white pb-8 md:pb-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-700">Completed</span>
                <span class="text-lg font-bold text-slate-900">0</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-white border-2 border-slate-800 flex items-center justify-center overflow-hidden relative">
                <div class="absolute inset-y-0 left-0 w-1/2 bg-slate-800"></div>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-700">In Progress</span>
                <span class="text-lg font-bold text-slate-900">4</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full border-2 border-slate-800"></div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-700">Not Started</span>
                <span class="text-lg font-bold text-slate-900">20</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    <!-- </div> -->
  `
})
export class ProductionDashboardComponent { }
