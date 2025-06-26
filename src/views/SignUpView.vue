<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">
                Register
                </h2>
                <p class="text-sm text-gray-600 font-medium">
                Create an account to access more features
                </p>
            </div>
        
            <form class="mt-10 space-y-6" @submit.prevent="register">
                <div class="space-y-4">
                <div class="group">
                    <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
                        Username
                    </label>
                    <input 
                    id="username" 
                    name="username" 
                    type="text" 
                    autocomplete="off" 
                    required
                    v-model="username"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white group-hover:border-gray-300"
                    placeholder="Enter your username"
                    >
                </div>
        
                <div class="group">
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                    </label>
                    <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autocomplete="email" 
                    required
                    v-model="email"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white group-hover:border-gray-300"
                    placeholder="Enter your email address"
                    >
                </div>
                <div class="group">
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        autocomplete="off" 
                        required
                        v-model="password"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white group-hover:border-gray-300"
                        placeholder="Enter your password"
                    >
                </div>
                                <div class="group">
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                        Password Confirmation
                    </label>
                    <input 
                        id="passwordConfirmation" 
                        name="passwordConfirmation" 
                        type="password"
                        autocomplete="off" 
                        required
                        v-model="passwordConfirmation"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white group-hover:border-gray-300"
                        placeholder="Enter your password"
                    >
                </div>
        
                <div class="pt-2">
                    <button 
                        type="submit"
                        class="cursor-pointer group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        </span>
                        Process registration
                    </button>
                </div>
                </div>
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-red-700 text-sm font-medium">{{ error }}</span>
                    </div>
                </div>
                <div class="text-center pt-1">
                    <p class="text-xs text-gray-500">
                        Already have an account?
                        <RouterLink to="/signin" class="text-blue-600 hover:text-blue-700 font-medium">Sign in</RouterLink>
                    </p>
                </div>
                <div class="text-center pt-4 border-t border-gray-100">
                    <p class="text-xs text-gray-500">
                    Secure and confidential registration. Your data is protected.
                    </p>
                </div>
            </form>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '@/api/api';
import { RouterLink, useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const error = ref('');
const router = useRouter();

const register = async () => {
  error.value = '';
    if (password.value !== passwordConfirmation.value) {
        error.value = 'Les mots de passe ne correspondent pas.';
        return;
    }
    if (!username.value || !email.value || !password.value) {
        error.value = 'Veuillez remplir tous les champs.';
        return;
    }
    try {
        const data = await registerUser(username.value, email.value, password.value);
        // Redirection après l'inscription réussie
        if (!data || !data.token) {
            throw new Error('Inscription échouée, veuillez réessayer.');
        }
        // Stocker le token et l'état d'admin dans le localStorage
        console.log('Inscription réussie:', data);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('isAdmin', data.is_admin);
        localStorage.setItem('username', data.username);
        window.dispatchEvent(new Event('storage'));
        router.push('/videodownloader');
    } catch (err) {
        // Si le serveur retourne un objet d’erreur complexe, on l’affiche proprement
        error.value = err.message;
    }
};
</script>

