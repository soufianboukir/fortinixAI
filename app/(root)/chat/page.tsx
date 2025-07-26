
'use client'

import axios from 'axios'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, CopyCheck, Loader, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { toast } from 'sonner';


type Message = {
  role: 'user' | 'ai',
  content: string
}



function Chat() {
  const [message,setMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const disableSend = message === ''
  const [messages,setMessages] = useState<Message[]>([])
  const [copy,setCopy] = useState({
    index: 0,
    type: '',
  })
  const [dots, setDots] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null);
  

  const handleSend = async () =>{
    try{
      setLoading(true)
      setMessage('')
      setMessages((prev) => [...prev, { role: 'user', content: message }]);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`,{prompt: message})
      if(res.status === 200){
        setMessages((prev) => [...prev, { role: 'ai', content: res.data.response }]);
      }
      
    }catch{

    }finally{
      setLoading(false)
    }
  }

  const handleCopy = async (text: string, index: number, type: 'text' | 'code' | 'like' | 'dislike') => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard')
      setCopy({type, index})
      setTimeout(() => {
        setCopy({index:0,  type: ''})
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleLike = () =>{

  }

  const handleDislike = () =>{

  }
  
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    return () => clearInterval(interval)
  }, [loading])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  

    return (
      <div>
        {
          messages.length === 0 && <div className="flex justify-center mt-20 mb-10">
            <h1 className="text-3xl font-mono font-semibold text-center">Hi, how can I assist you today?</h1>
          </div>
        }


        {messages && messages.length ? (
          <div className='h-[75vh] overflow-y-scroll scrollbar-hide w-[90%] md:w-[70%] mx-auto'>
            {messages.map((mssg: Message, index: number) => (
              <div key={index} className="flex flex-col mb-6">
                <div className={`flex ${mssg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex gap-2 items-start max-w-[80%]">
                    {mssg.role === 'ai' && (
                      <Image
                        src={'/icons/app-logo.png'}
                        width={30}
                        height={30}
                        alt={'user logo'}
                        className="rounded-full"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className={`font-semibold font-mono bg-muted rounded-md px-3 py-2 break-words ${mssg.role === 'ai' ? 'rounded-tl-none ': 'rounded-tr-none'}`}>
                        {mssg.content.includes('```') ? (
                          mssg.content.split(/```/).map((block, i) => (
                            i % 2 === 0 ? (
                              <span key={i}>{block}</span>
                            ) : (
                              <div key={i} className="dark:bg-black dark:text-white bg-white text-black font-mono text-sm p-3 rounded-md my-2 whitespace-pre-wrap">
                                <div className='flex justify-end'>
                                  {
                                    copy.type === 'code' && copy.index === index ? 
                                    <div  className='flex items-center gap-2 cursor-pointer text-green-600'>
                                      <CopyCheck className='w-4 h-4'/>
                                      <span>Copied</span>
                                    </div>
                                    : <button className='flex items-center gap-2 cursor-pointer' onClick={() => handleCopy(block,index,'code')}>
                                      <Copy className='w-4 h-4'/>
                                      <span>Copy</span>
                                    </button>
                                  }
                                </div>
                                {block}
                              </div>
                            )
                          ))
                        ) : (
                          mssg.content
                        )}
                      </span>
                      {mssg.role === 'ai' && (
                        <div className="flex justify-end gap-3 mt-2">
                          {
                            copy.type === 'text' && index === copy.index ?
                              <CopyCheck className="w-4 h-4 stroke-3 cursor-pointer hover:opacity-70 text-green-600" />
                            :
                            <Copy className="w-4 h-4 stroke-3 cursor-pointer hover:opacity-70" onClick={() => handleCopy(mssg.content,index,'text')}/>
                          }
                          <ThumbsUp className="w-4 h-4 stroke-3 cursor-pointer hover:opacity-70" onClick={handleLike}/>
                          <ThumbsDown className="w-4 h-4 stroke-3 cursor-pointer hover:opacity-70" onClick={handleDislike}/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {
              loading && <div className=''>
                  <div className='flex justify-start gap-2 items-center font-semibold font-mono'>
                    <Image
                      src={'/icons/app-logo.png'}
                      width={30}
                      height={30}
                      alt={'user logo'}
                      className="rounded-full"
                    />
                    <span>Thinking{dots}</span>
                  </div>
                </div>
            }
          </div>
        ) : null}

        <div ref={messagesEndRef}/>
        


        <div className="w-[90%] md:w-[60%] mx-auto relative">
          <Textarea placeholder="Type somthing..." className="text-sm"  rows={4} value={message} onChange={(e) => setMessage(e.target.value)}/>
          <Button className="absolute end-3 bottom-3 rounded-full" disabled={disableSend || loading} onClick={handleSend}>
              {
                loading ? <Loader className='animate-spin'/>
                : 
                <Send />
              }
            </Button>
        </div>
      </div>
    )
}


export default Chat