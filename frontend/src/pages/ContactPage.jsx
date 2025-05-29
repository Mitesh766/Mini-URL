import React from 'react';
import { Mail,Link as LinkIcon, Github, Linkedin, Send, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
    


    return (
        <div  className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Navigation */}
            <nav  className="relative z-10 px-6 py-4 backdrop-blur-sm bg-white/5 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                     <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r  from-purple-400 to-pink-400 p-2 rounded-xl shadow-lg">
                            <LinkIcon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Minli
                        </span>
                    </div>
                    <Link to="/">
                    <button className="px-6 cursor-pointer py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg">
                        Back to Home
                    </button>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 id='contactStart' className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have questions or suggestions? I'd love to hear from you. Let's connect and discuss how we can help.
                    </p>
                </div>

                <div className="flex  justify-center items-center">
                    {/* Contact Information */}
                    <div className="space-y-8 md:w-[70%]">
                        {/* Profile Card */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Mitesh Agrawal</h2>
                                    <p className="text-gray-400">Developer & Creator</p>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                I'm passionate about creating efficient web solutions and tools that make life easier. 
                                Feel free to reach out for collaborations, questions, or just to say hello!
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
                            
                            {/* Email */}
                            <a 
                                href="mailto:miteshagrawal972@gmail.com"
                                className="group flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                <div className="bg-gradient-to-r from-red-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center group-hover:animate-pulse">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Email</h4>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">miteshagrawal972@gmail.com</p>
                                </div>
                            </a>

                            {/* GitHub */}
                            <a 
                                href="https://github.com/Mitesh766"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                <div className="bg-gradient-to-r from-gray-600 to-gray-800 w-12 h-12 rounded-xl flex items-center justify-center group-hover:animate-pulse">
                                    <Github className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">GitHub</h4>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">github.com/Mitesh766</p>
                                </div>
                            </a>

                            {/* LinkedIn */}
                            <a 
                                href="https://linkedin.com/in/mitesh-agrawal76"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center group-hover:animate-pulse">
                                    <Linkedin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">LinkedIn</h4>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">linkedin.com/in/mitesh-agrawal76</p>
                                </div>
                            </a>
                        </div>
                    </div>

                
                </div>

                {/* Quick Response Info */}
                <div className="mt-16 text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Quick Response Guaranteed
                    </h3>
                    <p className="text-gray-300 text-lg">
                        I typically respond to all messages within 24 hours. For urgent matters, feel free to reach out directly via email.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;