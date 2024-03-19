import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const { text, shift_amount, direction } = await request.json();

    if (!text) {
        return NextResponse.json({ error: 'Text is required' }, {status: 404})
    }

    if (shift_amount === undefined) {
        return NextResponse.json({ error: "Shift amount is required" }, {status: 404});
    }

    if (!direction) {
        return NextResponse.json({ error: "Direction is required" }, { status: 400});
    }

    const result = caesarCipher(text, shift_amount, direction);
    return NextResponse.json({ result }, {status: 200});
}

function caesarCipher(text: string, shift_amount: number, direction: string): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let resultText = "";

    if (direction === "decode"){
        shift_amount = -shift_amount;
    }

    for (let char of text){
        if(alphabet.includes(char)){
            let currentPosition = alphabet.indexOf(char);
            let newPosition = (currentPosition + shift_amount + 26) % 26;
            resultText += alphabet[newPosition];
        } else {
            resultText += char;
        }
    }

    return resultText;
}

