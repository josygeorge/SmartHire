import { Request, Response, NextFunction } from 'express';
import { ScreeningResult } from '../models/ScreeningResult.model';
import { Applicant } from '../models/Applicant.model';
import { Job } from '../models/Job.model';
// import fetch from 'node-fetch'; //
import axios from 'axios'; // or axios

/*The createScreeningResult controller is designed 
to save screening results generated autonomously by the AI agent 
— not through a manual form submission by a human*/

export const createScreeningResult = async (req: Request, res: Response) => {
  try {
    const result = new ScreeningResult(req.body);
    const saved = await result.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'ScreeningResult creation failed', details: error });
  }
};

export const getScreeningResults = async (_: Request, res: Response) => {
  const results = await ScreeningResult.find()
    .populate('applicantId', 'name email')
    .populate('jobId', 'title description')
    .sort({ createdAt: -1 });
  res.json(results);
};

// AI integration
// Run Screening

// AI integration
// Run Screening

export const runAIForScreeningResult = async (
  req: Request,
  res: Response,
  next?: NextFunction // 'next' is typically for middleware, not needed here unless you chain
): Promise<any> => {
  // Changed return type to Promise<void> as it sends HTTP response
  try {
    const { applicantId, jobId } = req.body;

    const applicant = await Applicant.findById(applicantId);
    const job = await Job.findById(jobId);

    if (!applicant || !job) {
      return res.status(404).json({ error: 'Applicant or Job not found' });
    }

    // Determine which model to use based on your needs
    const aiModel = 'mistralai/devstral-small:free'; // Or 'mistralai/mistral-nemo:free'

    // This is your actual prompt for AI screening
    const screeningPrompt = `
Given this resume:\n${applicant.resumeText}

And this job description:\n${job.description}

Provide:
- A match score (0-100)
- A one-paragraph summary
- 3 strengths
- 3 weaknesses
- 3 interview questions
Respond as a JSON object.
`;

    // Ensure your API key is available
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY environment variable is not set.');
      return res
        .status(500)
        .json({ error: 'Server configuration error: API key missing.' });
    }

    let aiContent: string | undefined;

    try {
      const openRouterResponse = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: aiModel,
          messages: [
            {
              role: 'system',
              content:
                'You are an expert HR assistant. Always respond with valid JSON.',
            }, // Crucial for JSON output
            { role: 'user', content: screeningPrompt }, // Use your actual screening prompt here
          ],
          response_format: { type: 'json_object' }, // Helps models output JSON
          // Optional: You might want to adjust temperature or max_tokens for better control
          // temperature: 0.2, // Lower temperature for more deterministic output
          // max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      aiContent = openRouterResponse.data.choices?.[0]?.message?.content;

      if (!aiContent) {
        console.error('OpenRouter returned no content.');
        return res.status(500).json({ error: 'AI did not return content.' });
      }
    } catch (openRouterError: any) {
      console.error(
        'OpenRouter API Call Error:',
        openRouterError.response?.data || openRouterError.message
      );
      // Pass the specific OpenRouter error back to the client
      return res.status(502).json({
        // 502 Bad Gateway for external API errors
        error: 'Failed to get response from AI model (OpenRouter).',
        details: openRouterError.response?.data || openRouterError.message,
      });
    }

    // Attempt to parse the JSON content from the AI
    let parsedAIResponse: any;
    try {
      parsedAIResponse = JSON.parse(aiContent);
    } catch (parseError) {
      console.error(
        'Failed to parse AI content as JSON:',
        aiContent,
        parseError
      );
      return res.status(500).json({
        error: 'AI response was not valid JSON.',
        aiContent: aiContent, // Send raw AI content for debugging if it's not sensitive
      });
    }

    // Now, save the screening result
    const result = await ScreeningResult.create({
      applicantId,
      jobId,
      summary: parsedAIResponse.summary,
      score: parsedAIResponse.score,
      strengths: parsedAIResponse.strengths,
      weaknesses: parsedAIResponse.weaknesses,
      interviewQuestions: parsedAIResponse.interviewQuestions,
    });

    // Finally, send the saved result back to the frontend
    res.status(200).json(result);
  } catch (err) {
    console.error('General Server Error in runAIForScreeningResult:', err);
    res
      .status(500)
      .json({
        error: 'AI screening failed due to an unexpected server error.',
      });
  }
};

/* export const runAIForScreeningResult = async (
  req: Request,
  res: Response,
  next?: NextFunction
): Promise<any> => {
  try {
    const { applicantId, jobId } = req.body;

    const applicant = await Applicant.findById(applicantId);
    const job = await Job.findById(jobId);
    if (!applicant || !job)
      return res.status(404).json({ error: 'Applicant or Job not found' });

    const prompt = `
Given this resume:\n${applicant.resumeText}

And this job description:\n${job.description}

Provide:
- A match score (0-100)
- A one-paragraph summary
- 3 strengths
- 3 weaknesses
- 3 interview questions
Respond as a JSON object.
`;

    /* const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mixtral-8x7b',
        //model: 'openrouter/mixtral-8x7b',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    ); */
/* try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          //model: 'mistralai/mistral-nemo:free',
          model: 'mistralai/devstral-small:free',
          messages: [
            { role: 'system', content: 'You are a helpful AI assistant.' },
            {
              role: 'user',
              content: 'What are the benefits of learning Node.js?',
            },
          ],
          //model: 'mistralai/mixtral-8x7b',
          //model: 'mixtral-8x7b',
          //messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error: any) {
      console.error('OpenRouter Error:', error.response?.data || error.message);
      throw error;
    }
    /* const aiContent = response.data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(aiContent || '{}');

    const result = await ScreeningResult.create({
      applicantId,
      jobId,
      summary: parsed.summary,
      score: parsed.score,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      interviewQuestions: parsed.interviewQuestions,
    });

    res.json(result);*/
/*  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI screening failed' });
  }
}; */
