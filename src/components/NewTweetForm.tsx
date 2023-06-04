import { useSession } from "next-auth/react";
import { api } from "~/utils/api"
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
    if (textArea == null) return
    textArea.style.height = "0"
    textArea.style.height = `${textArea.scrollHeight}px`
}

export function NewTweetForm() {
    const session = useSession()
    if (session.status !== "authenticated") return null

    return <Form />
}

function Form() {
    const session = useSession()
    const [inputValue, setInputValue] = useState("")
    const [buttonStatus, setButtonStatus] = useState(true)
    const textAreaRef = useRef<HTMLTextAreaElement>()
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaSize(textArea);
        textAreaRef.current = textArea;
    }, [])

    useLayoutEffect(() => {
        updateTextAreaSize(textAreaRef.current)
    }, [inputValue])

    const createTweet = api.tweet.create.useMutation({ onSuccess: newTweet => {
        setInputValue("")
    }})

    if (session.status !== "authenticated") return null

    const handleChange = (event: any) => {
        event.preventDefault()

        setInputValue(event.target.value);

        console.log(inputValue)

        if(event.target.value.trim().length > 0) {
            setButtonStatus(false)
        }else {
            setButtonStatus(true)
        }

    };

    function handleSubmit() {
        createTweet.mutate({ content: inputValue })
    }
        
     return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-4">
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />
                <textarea 
                    ref={inputRef}
                    style={{ height: 0 }}
                    value={inputValue}
                    onChange={e => handleChange(e)}
                    className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" 
                    placeholder="What's happening?">
                </textarea>
            </div>
            <Button className="self-end" disabled={buttonStatus} >Tweet</Button>
        </form>
     );
}