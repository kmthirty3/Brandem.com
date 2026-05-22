/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to store leads locally
const LEADS_FILE_PATH = path.join(process.cwd(), 'leads.json');

// Ensure leads file exists
if (!fs.existsSync(LEADS_FILE_PATH)) {
  fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify([], null, 2));
}

// Read leads from local file
function readLeads() {
  try {
    const data = fs.readFileSync(LEADS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading leads:', err);
    return [];
  }
}

// Write leads to local file
function writeLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error('Error writing leads:', err);
  }
}

// Lazy initialization of Gemini SDK client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ GEMINI_API_KEY is not defined. AI brief generator will return a placeholder.');
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || 'MOCK_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// API Route: Register a lead and generate its AI Cinematic Outline
app.post('/api/consult', async (req, res) => {
  try {
    const { name, company, email, phone, service, challenge } = req.body;

    if (!name || !company || !email || !challenge) {
      res.status(400).json({ error: 'Missing required parameters: name, company, email, challenge' });
      return;
    }

    const leads = readLeads();
    const newLeadId = `lead_${Date.now()}`;

    let aiConcept = '';

    // If Gemini key is defined, trigger the AI strategic brief generator
    if (process.env.GEMINI_API_KEY) {
      try {
        const client = getGeminiClient();
        const serviceLabel = {
          'tvc': 'TVC / OVC Cinematic Production (চলচ্চিত্রের মতো বিজ্ঞাপন)',
          'pr': 'Artist Brand Management & PR (তারকার আস্থা)',
          'strategy': 'High-Stakes Brand Strategy (ব্যবসার স্থায়ী strategy)',
          'political': 'Political & Mass Campaign (নির্বাচনী শক্তি)',
          'full': 'Full Brand Partnership (পূর্ণাঙ্গ ব্র্যান্ড অংশীদারিত্ব)'
        }[service as string] || 'Elite Brand Storytelling';

        const prompt = `
          Brand / Company Name: "${company}"
          Prospect Contact: "${name}"
          Requested Service Area: "${serviceLabel}"
          Brand's Core Challenge & Target: "${challenge}"
        `;

        const response = await client.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            systemInstruction: `You are KM Abdul Kaium, the elite filmmaker, BFDC certified director, and founder of Brandem, Bangladesh. Your core motto is: "We don't make ads. We engineer want." (আমরা বিজ্ঞাপন বানাই না, আমরা আকাঙ্ক্ষা তৈরি করি।). 
Your tone is highly authoritative, analytical, cinematic, artistic, and written in elegant Benglish (fluent English mixed with key persuasive Bengali brand hooks).

Analyze the brand's details and generate a highly customized "Brandem Cinematic Outline & Strategic Brief".

Your response MUST be organized into these structural headings using Markdown:

### 1. THE CORE DESIRE (আকাঙ্ক্ষা ইঞ্জিনিয়ারিং)
Explain what deep, psychological wanting or consumer desire we need to engineer for this specific brand's target audience in Bangladesh (not a generic sales pitch, but a deep psychological drive).

### 2. THE CINEMATIC FRAME (ভিজ্যুয়াল ট্রিটমেন্ট)
Describe a cinematic opening shot or commercial treatment concept for this brand. Talk about rich lighting (warm noir/neon), camera lenses (Sigma 85mm f/1.4), film compression, and actor expressions to capture the raw premium look of a Sony FX3 Netflix grade production.

### 3. THE BRAND BULLET (কৌতুহল স্লোগান)
Suggest 1 high-impact tagline or slogan (in both stylish Bengali and refined English) that positions the brand as the undisputed market leader.

### 4. THE ACTION BLUEPRINT (৩-ধাপের কৌশল)
Map out 3 literal, tactical steps Brandem would execute to move this market (e.g. leveraging celebrity/digital creator networks directly from our personal book, building a high-impact narrative wave, or launching a mass engagement campaign).

End with a direct, encouraging corporate Director's quote: "গল্পটা তোমার, কিন্তু সেটা বাজার কাঁপানোর মতো করে বলার দায়িত্ব আমাদের।" (We are ready to tell your story in a way that captures the market).`,
            temperature: 0.82
          }
        });

        aiConcept = response.text || '';
      } catch (geminiError: any) {
        console.error('Gemini content generation failed:', geminiError);
        aiConcept = `### 1. THE CORE DESIRE (আকাঙ্ক্ষা ইঞ্জিনিয়ারিং)
We will engineer the ultimate premium positioning for **${company}**, building a deep desire for undisputed quality.

### 2. THE CINEMATIC FRAME (ভিজ্যুয়াল ট্রিটমেন্ট)
We leverage our Sony FX3 camera gear, rich neon-backlit aesthetics, high-end frame depth compression, and top-tier cinematic storytelling to make your brand look like a motion-picture statement.

### 3. THE BRAND BULLET (কৌতুহল স্লোগান)
**"বাকি সবাই অনুকরণ করবে, আপনি নেতৃত্ব দিন।"** 
*(Everyone else will follow. You lead.)*

### 4. THE ACTION BLUEPRINT (৩-ধাপের কৌশল)
1. Cinematic brand film production using Netflix-certified gears.
2. Custom celebrity and micro-influencer endorsement strategy.
3. Full digital rollout prioritizing direct customer conversion over generic views.`;
      }
    } else {
      // Return beautiful mock concept if API key is not yet set up
      aiConcept = `### 1. THE CORE DESIRE (আকাঙ্ক্ষা ইঞ্জিনিয়ারিং)
To establish **${company}** as the supreme authority in your space, transforming a simple purchase into an emotional badge of honor for Bangladeshi consumers.

### 2. THE CINEMATIC FRAME (ভিজ্যুয়াল ট্রিটমেন্ট)
A low-lit, premium cinematic narrative using our **Sony FX3 Cinema Rig** with an ultra-shallow depth of field (Sigma 85mm f/1.4). Deep shadows and dynamic gold lens-flare highlights will frame your product as an object of high artistic desire.

### 3. THE BRAND BULLET (কৌতুহল স্লোগান)
**"${company}: অন্য সব বিকল্প যেখানে শেষ হয়।"**
*(Where all other alternatives come to an end.)*

### 4. THE ACTION BLUEPRINT (৩-ধাপের কৌশল)
1. Produce an authentic 45-second cinematic digital commercial.
2. Direct-dial launch utilizing Brandem's personal contact circle of top-tier celebrities.
3. Conversion-optimized interactive landing ecosystem deployment.

*Note: Add your GEMINI_API_KEY in Settings > Secrets to unlock personalized AI generation treatments.*`;
    }

    const newLead = {
      id: newLeadId,
      name,
      company,
      email,
      phone: phone || '',
      service: service || '',
      challenge,
      aiConcept,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    leads.push(newLead);
    writeLeads(leads);

    res.status(201).json(newLead);
  } catch (error: any) {
    console.error('Error handling lead registration:', error);
    res.status(500).json({ error: 'Server error processing consultation lead' });
  }
});

// API Route: Get all leads (for the Admin Panel)
app.get('/api/leads', (req, res) => {
  try {
    const leads = readLeads();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve strategy leads' });
  }
});

// API Route: Update lead status
app.patch('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'reviewed', 'contacted'].includes(status)) {
      res.status(400).json({ error: 'Invalid or missing status parameter' });
      return;
    }

    const leads = readLeads();
    const leadIndex = leads.findIndex((l: any) => l.id === id);

    if (leadIndex === -1) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }

    leads[leadIndex].status = status;
    writeLeads(leads);

    res.json(leads[leadIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead status' });
  }
});

// API Route: Delete a lead
app.delete('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const leads = readLeads();
    const filteredLeads = leads.filter((l: any) => l.id !== id);

    if (leads.length === filteredLeads.length) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }

    writeLeads(filteredLeads);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// Configure Vite integration based on environment
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎬 Brandem Studio Server starting on http://localhost:${PORT}`);
  });
}

setupServer();
