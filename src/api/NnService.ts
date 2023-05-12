

export default class NnService {
    static async classifyText(text: string): Promise<string> {
        const response = await fetch(`http://localhost:8000/classify?text=${encodeURIComponent(text)}`);
        return await response.text();
    }
}