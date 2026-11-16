'server-only';

import { Faculty, TourData } from "../types/MarzipanoTypes";
import fs from 'fs';
import path from 'path';



export async function loadTourData(faculty: Faculty): Promise<TourData> {
    const dataPath = path.join(process.cwd(), `data/${faculty}/data.json`);
    console.log('Fetching data from:', dataPath);
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const data: TourData = JSON.parse(fileContent);
    return data;
}
