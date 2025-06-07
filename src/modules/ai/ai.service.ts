import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
const qs = require('querystring');

@Injectable()
export class AiService {
    constructor(
        private readonly configService: ConfigService,
    ) { }
    async getSavingAdvice(goalName: string, target: number, current: number, dueDate: string): Promise<string> {
        const remaining = target - current;
        const daysLeft = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const daily = remaining > 0 && daysLeft > 0 ? (remaining / daysLeft).toFixed(2) : 0;

        const prompt = `
คุณเป็นผู้ช่วยวางแผนการเงิน:
เป้าหมาย: ${goalName}
เป้าหมายรวม: ${target} บาท
ปัจจุบันมี: ${current} บาท
ครบกำหนด: ${dueDate}
transaction: [
  {
    "id": 1,
    "name": "อาหาร",
    "type": "expense",
    "user": {
      "id": 1,
      "email": "upskill@gmail.com",
      "password": "strongPassword123",
      "firstName": "John",
      "lastName": "Doe",
      "studentId": "",
      "academicYear": "",
      "role": "user",
      "createdAt": "2025-05-27T07:25:12.000Z",
      "updatedAt": "2025-05-27T07:25:12.000Z"
    },
    "createdAt": "2025-05-27T08:39:33.784Z",
    "updatedAt": "2025-05-27T08:47:07.535Z"
  },
  {
    "id": 5,
    "name": "รายได้พิเศษ",
    "type": "income",
    "user": {
      "id": 1,
      "email": "upskill@gmail.com",
      "password": "strongPassword123",
      "firstName": "John",
      "lastName": "Doe",
      "studentId": "",
      "academicYear": "",
      "role": "user",
      "createdAt": "2025-05-27T07:25:12.000Z",
      "updatedAt": "2025-05-27T07:25:12.000Z"
    },
    "createdAt": "2025-05-27T08:47:36.686Z",
    "updatedAt": "2025-05-27T08:47:36.686Z"
  },
  {
    "id": 8,
    "name": "ขายยา",
    "type": "income",
    "user": {
      "id": 1,
      "email": "upskill@gmail.com",
      "password": "strongPassword123",
      "firstName": "John",
      "lastName": "Doe",
      "studentId": "",
      "academicYear": "",
      "role": "user",
      "createdAt": "2025-05-27T07:25:12.000Z",
      "updatedAt": "2025-05-27T07:25:12.000Z"
    },
    "createdAt": "2025-05-31T07:44:45.306Z",
    "updatedAt": "2025-05-31T07:44:45.306Z"
  },
  {
    "id": 9,
    "name": "ข้าว",
    "type": "expense",
    "user": {
      "id": 1,
      "email": "upskill@gmail.com",
      "password": "strongPassword123",
      "firstName": "John",
      "lastName": "Doe",
      "studentId": "",
      "academicYear": "",
      "role": "user",
      "createdAt": "2025-05-27T07:25:12.000Z",
      "updatedAt": "2025-05-27T07:25:12.000Z"
    },
    "createdAt": "2025-05-31T08:24:51.962Z",
    "updatedAt": "2025-05-31T08:24:51.962Z"
  },
  {
    "id": 10,
    "name": "เดินทาง",
    "type": "expense",
    "user": {
      "id": 1,
      "email": "upskill@gmail.com",
      "password": "strongPassword123",
      "firstName": "John",
      "lastName": "Doe",
      "studentId": "",
      "academicYear": "",
      "role": "user",
      "createdAt": "2025-05-27T07:25:12.000Z",
      "updatedAt": "2025-05-27T07:25:12.000Z"
    },
    "createdAt": "2025-05-31T08:25:05.006Z",
    "updatedAt": "2025-05-31T08:25:05.006Z"
  },
  {
    "id": 11,
    "name": "ข้าวเช้า",
    "type": "expense",
    "user": {
      "id": 11,
      "email": "upskill7@gmail.com",
      "password": "$2b$10$ej.ZJvySZBmmV82fJDRAM.3627NFYWt56CtJKrX3qTWVFCj1BEFli",
      "firstName": "John7",
      "lastName": "Doe",
      "studentId": "1689919123",
      "academicYear": "2568",
      "role": "admin",
      "createdAt": "2025-05-29T23:41:04.000Z",
      "updatedAt": "2025-05-30T01:35:35.000Z"
    },
    "createdAt": "2025-05-31T08:26:08.061Z",
    "updatedAt": "2025-05-31T08:26:08.061Z"
  },
  {
    "id": 12,
    "name": "ขนม",
    "type": "income",
    "user": {
      "id": 11,
      "email": "upskill7@gmail.com",
      "password": "$2b$10$ej.ZJvySZBmmV82fJDRAM.3627NFYWt56CtJKrX3qTWVFCj1BEFli",
      "firstName": "John7",
      "lastName": "Doe",
      "studentId": "1689919123",
      "academicYear": "2568",
      "role": "admin",
      "createdAt": "2025-05-29T23:41:04.000Z",
      "updatedAt": "2025-05-30T01:35:35.000Z"
    },
    "createdAt": "2025-05-31T08:26:17.999Z",
    "updatedAt": "2025-05-31T08:26:17.999Z"
  },
  {
    "id": 13,
    "name": "ค่าข้าว",
    "type": "expense",
    "user": {
      "id": 13,
      "email": "aa2@gmail.com",
      "password": "$2b$10$64f3pHnvWMHgMX9IMAAlz.60n6rV8wL./0fpfaB8MShGwHrbLbBUO",
      "firstName": "asdf",
      "lastName": "sdf",
      "studentId": "1900292639",
      "academicYear": null,
      "role": "user",
      "createdAt": "2025-05-31T08:00:40.000Z",
      "updatedAt": "2025-06-06T08:06:53.000Z"
    },
    "createdAt": "2025-06-06T07:50:21.256Z",
    "updatedAt": "2025-06-06T07:50:21.256Z"
  },
  {
    "id": 14,
    "name": "เงินรายสัปดาห์",
    "type": "income",
    "user": {
      "id": 13,
      "email": "aa2@gmail.com",
      "password": "$2b$10$64f3pHnvWMHgMX9IMAAlz.60n6rV8wL./0fpfaB8MShGwHrbLbBUO",
      "firstName": "asdf",
      "lastName": "sdf",
      "studentId": "1900292639",
      "academicYear": null,
      "role": "user",
      "createdAt": "2025-05-31T08:00:40.000Z",
      "updatedAt": "2025-06-06T08:06:53.000Z"
    },
    "createdAt": "2025-06-06T07:50:32.067Z",
    "updatedAt": "2025-06-06T07:50:32.067Z"
  },
  {
    "id": 15,
    "name": "เงินเดือน",
    "type": "income",
    "user": {
      "id": 13,
      "email": "aa2@gmail.com",
      "password": "$2b$10$64f3pHnvWMHgMX9IMAAlz.60n6rV8wL./0fpfaB8MShGwHrbLbBUO",
      "firstName": "asdf",
      "lastName": "sdf",
      "studentId": "1900292639",
      "academicYear": null,
      "role": "user",
      "createdAt": "2025-05-31T08:00:40.000Z",
      "updatedAt": "2025-06-06T08:06:53.000Z"
    },
    "createdAt": "2025-06-06T07:50:38.075Z",
    "updatedAt": "2025-06-06T07:50:38.075Z"
  },
  {
    "id": 16,
    "name": "ค่าน้ำมัน",
    "type": "expense",
    "user": {
      "id": 13,
      "email": "aa2@gmail.com",
      "password": "$2b$10$64f3pHnvWMHgMX9IMAAlz.60n6rV8wL./0fpfaB8MShGwHrbLbBUO",
      "firstName": "asdf",
      "lastName": "sdf",
      "studentId": "1900292639",
      "academicYear": null,
      "role": "user",
      "createdAt": "2025-05-31T08:00:40.000Z",
      "updatedAt": "2025-06-06T08:06:53.000Z"
    },
    "createdAt": "2025-06-06T07:50:48.704Z",
    "updatedAt": "2025-06-06T07:50:48.704Z"
  }
]

คำนวนเงินปัจจบันจาก บวกกับ transaction income และลบ expense ข้างต้น
วันนี่คือวันที่: ${new Date().toISOString().split('T')[0]}
แนะนำการเก็บเงินอย่างเหมาะสมให้หน่อย เช่น ต่อวัน หรือสัปดาห์ 

แสดงคำตอบสั้นๆ และชัดเจน เช่น "คุณควรเก็บเงินวันละ xxx บาท" หรือ "คุณควรเก็บเงินสัปดาห์ละ xxx บาท" , "คุณเหลืออีก xxx บาท ภายใน x เดือน ควรเก็บเดือนละ xxx บาท"
`;

        const model = 'gpt-3.5-turbo';
        const apiUrl = `http://195.179.229.119/gpt/api.php?${qs.stringify({
            prompt: prompt,
            api_key: this.configService.get('AI_API_KEY'),
            model: model
        })}`;
        try {
            const response = await axios.get(apiUrl);
            // Print the response data
            console.log(response.data);
            if (response.data && typeof response.data === 'object' && response.data['content']) {
                return String(response.data['content']);
            }
            return String(response.data);
        } catch (error: any) {
            // Print any errors
            console.error('Request Error:', error.message);
            return 'เกิดข้อผิดพลาดในการขอข้อมูลจาก AI';
        }
    }

    async getGeminiAdvice(goalName: string, target: number, current: number, dueDate: string): Promise<string> {
        const remaining = target - current;
        const daysLeft = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const daily = remaining > 0 && daysLeft > 0 ? (remaining / daysLeft).toFixed(2) : 0;

        const prompt = `
    คุณเป็นผู้ช่วยวางแผนการเงิน:
    เป้าหมาย: ${goalName}
    เป้าหมายรวม: ${target} บาท
    ปัจจุบันมี: ${current} บาท
    ครบกำหนด: ${dueDate}
    วันนี่คือวันที่: ${new Date().toISOString().split('T')[0]}
    แนะนำการเก็บเงินอย่างเหมาะสมให้หน่อย เช่น ต่อวัน หรือสัปดาห์ 

    แสดงคำตอบสั้นๆ และชัดเจน เช่น "คุณควรเก็บเงินวันละ xxx บาท" หรือ "คุณควรเก็บเงินสัปดาห์ละ xxx บาท" , "คุณเหลืออีก xxx บาท ภายใน x เดือน ควรเก็บเดือนละ xxx บาท"
    `;

        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

        console.log('Gemini API URL:', apiUrl, this.configService.get('GEMINI_API_KEY'));
        
        try {
            const response = await axios.post(
                `${apiUrl}?key=${this.configService.get('GEMINI_API_KEY')}`,
                {
                    contents: [
                        {
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800
                    }
                }
            );
            
            const responseData = response.data as any;
            if (responseData && 
                    responseData.candidates && 
                    responseData.candidates[0] && 
                    responseData.candidates[0].content && 
                    responseData.candidates[0].content.parts && 
                    responseData.candidates[0].content.parts[0] && 
                    responseData.candidates[0].content.parts[0].text) {
                return responseData.candidates[0].content.parts[0].text;
            }
            
            return 'ไม่สามารถรับคำแนะนำได้ในขณะนี้';
        } catch (error: any) {
            console.error('Gemini API Error:', error.message);
            return 'เกิดข้อผิดพลาดในการขอข้อมูลจาก Gemini AI';
        }
    }
}
