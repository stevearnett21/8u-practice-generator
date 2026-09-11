// Store our database in memory
let drillsDatabase = [];

// 1. Fetch the JSON data as soon as the app loads
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('drills.json');
        drillsDatabase = await response.json();
        console.log("Database loaded successfully!");
    } catch (error) {
        console.error("Error loading drills:", error);
    }
});

// 2. The function that runs when you tap "GENERATE PLAN"
function generatePlan() {
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('dugout-card').classList.remove('hidden');

    const container = document.getElementById('practice-blocks-container');
    container.innerHTML = ''; 

    const fieldingDrill = drillsDatabase.find(d => d.category === 'fielding');
    const hittingDrill = drillsDatabase.find(d => d.category === 'hitting');
    const gameDrill = drillsDatabase.find(d => d.category === 'game');
    
    if (fieldingDrill && hittingDrill) {
        container.innerHTML += createDrillBlock("Station Rotations", "30 MIN", fieldingDrill, hittingDrill);
    }

    if (gameDrill) {
        container.innerHTML += createSingleBlock("Fun Finisher", "10 MIN", gameDrill);
    }
}

// 3. Toggle Function for the Diagrams
function toggleDiagram(drillId) {
    const diagramDiv = document.getElementById('diagram-' + drillId);
    if (diagramDiv.classList.contains('hidden')) {
        diagramDiv.classList.remove('hidden');
    } else {
        diagramDiv.classList.add('hidden');
    }
}

// 4. HTML Generators for the UI blocks
function createDrillBlock(blockTitle, timeBlock, drill1, drill2) {
    return `
    <div class="border-2 border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm print-break mb-5">
        <div class="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
            <span class="font-black text-slate-700 tracking-tight">${blockTitle}</span>
            <span class="text-xs font-black text-slate-400 bg-slate-200 px-2 py-1 rounded">${timeBlock}</span>
        </div>
        
        <!-- Station 1 -->
        <div class="p-4 border-b border-slate-100 space-y-3">
            <div class="inline-block bg-blue-100 text-blue-800 text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded mb-1">Station 1</div>
            
            <div class="flex justify-between items-start">
                <h3 class="font-black text-lg text-slate-900 leading-tight">${drill1.title}</h3>
                ${drill1.diagram ? `<button onclick="toggleDiagram('${drill1.id}')" class="no-print text-xs bg-slate-50 text-slate-500 font-bold px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors flex items-center">👁️ Diagram</button>` : ''}
            </div>
            
            <div id="diagram-${drill1.id}" class="hidden my-2 bg-slate-50 border border-slate-200 p-2 rounded flex justify-center">
                <img src="${drill1.diagram}" alt="${drill1.title} Diagram" class="max-w-full rounded" onerror="this.outerHTML='<span class=\\'text-xs text-slate-400 italic\\'>Diagram image missing/not uploaded yet.</span>'">
            </div>

            <p class="text-sm text-slate-600"><span class="font-bold">Setup:</span> ${drill1.setup}</p>
            <p class="text-sm text-slate-600"><span class="font-bold">Execution:</span> ${drill1.execution}</p>
            ${drill1.cultureCue ? `<div class="bg-blue-50 border-l-4 border-blue-500 p-3 mt-3 rounded-r-lg"><p class="text-sm text-blue-900 leading-snug"><span class="font-bold">Culture Cue:</span> ${drill1.cultureCue}</p></div>` : ''}
        </div>

        <!-- Station 2 -->
        <div class="p-4 space-y-3 bg-slate-50">
            <div class="inline-block bg-orange-100 text-orange-800 text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded mb-1">Station 2</div>
            
            <div class="flex justify-between items-start">
                <h3 class="font-black text-lg text-slate-900 leading-tight">${drill2.title}</h3>
                ${drill2.diagram ? `<button onclick="toggleDiagram('${drill2.id}')" class="no-print text-xs bg-slate-50 text-slate-500 font-bold px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors flex items-center">👁️ Diagram</button>` : ''}
            </div>

            <div id="diagram-${drill2.id}" class="hidden my-2 bg-slate-50 border border-slate-200 p-2 rounded flex justify-center">
                <img src="${drill2.diagram}" alt="${drill2.title} Diagram" class="max-w-full rounded" onerror="this.outerHTML='<span class=\\'text-xs text-slate-400 italic\\'>Diagram image missing/not uploaded yet.</span>'">
            </div>

            <p class="text-sm text-slate-600"><span class="font-bold">Execution:</span> ${drill2.execution}</p>
        </div>
    </div>
    `;
}

function createSingleBlock(blockTitle, timeBlock, drill) {
    return `
    <div class="border-2 border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm print-break mb-5">
        <div class="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
            <span class="font-black text-slate-700 tracking-tight">${blockTitle}</span>
            <span class="text-xs font-black text-slate-400 bg-slate-200 px-2 py-1 rounded">${timeBlock}</span>
        </div>
        <div class="p-4 space-y-3">
            
            <div class="flex justify-between items-start">
                <h3 class="font-black text-lg text-slate-900 leading-tight">${drill.title}</h3>
                ${drill.diagram ? `<button onclick="toggleDiagram('${drill.id}')" class="no-print text-xs bg-slate-50 text-slate-500 font-bold px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors flex items-center">👁️ Diagram</button>` : ''}
            </div>

            <div id="diagram-${drill.id}" class="hidden my-2 bg-slate-50 border border-slate-200 p-2 rounded flex justify-center">
                <img src="${drill.diagram}" alt="${drill.title} Diagram" class="max-w-full rounded" onerror="this.outerHTML='<span class=\\'text-xs text-slate-400 italic\\'>Diagram image missing/not uploaded yet.</span>'">
            </div>

            <p class="text-sm text-slate-600"><span class="font-bold">Execution:</span> ${drill.execution}</p>
            ${drill.cultureCue ? `<div class="bg-blue-50 border-l-4 border-blue-500 p-3 mt-3 rounded-r-lg"><p class="text-sm text-blue-900 leading-snug"><span class="font-bold">Culture Cue:</span> ${drill.cultureCue}</p></div>` : ''}
        </div>
    </div>
    `;
}
