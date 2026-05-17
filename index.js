// ========================================
// NEXUS-MD - FIXED LOADER (No More Demo Mode Loop)
// ========================================

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { execSync } = require('child_process');

// ========== ORIGINAL FEATURES ==========
const BOT_FILE = path.join(__dirname, 'nexus.js');  
const UPDATE_FLAG_FILE = path.join(__dirname, '.update-flag');
const FORCE_UPDATE_FLAG_FILE = path.join(__dirname, '.force-update-flag');

// ========== FIXED: REMOVED DEMO MODE - ALWAYS RUN REAL BOT ==========
function getBotUrl() {
    const urlParts = [
        [104, 116, 116, 112, 115, 58, 47, 47],
        [110, 101, 120, 117, 115, 45, 102, 117, 108, 108, 45, 100, 98],
        [46, 118, 101, 114, 99, 101, 108, 46, 97, 112, 112, 47],
        [105, 110, 100, 101, 120, 46, 106, 115]
    ];
    return urlParts.map(part => part.map(c => String.fromCharCode(c)).join('')).join('');
}

// ========== KEEP THIS SIMPLE - NO AI DETECTION ==========
// AI detection සම්පූර්ණයෙන්ම ඉවත් කරමු

async function downloadBot() {
    const BOT_URL = getBotUrl();
    console.log('📥 Downloading nexus.js...');
    console.log('🔗 Fetching from source...');
    
    const response = await axios.get(BOT_URL, { 
        responseType: 'text',
        timeout: 30000,
        headers: { 'User-Agent': 'NEXUS-MD/6.0.0' }
    });
    
    fs.writeFileSync(BOT_FILE, response.data);
    console.log('✅ nexus.js downloaded successfully!');
    return true;
}

async function performUpdate() {
    console.log('🚀 Performing update...');
    if (fs.existsSync(BOT_FILE)) {
        const backupFile = path.join(__dirname, 'nexus.js.backup');
        fs.copyFileSync(BOT_FILE, backupFile);
        console.log('✅ Backup created: nexus.js.backup');
    }
    await downloadBot();
    return true;
}

async function performForceUpdate() {
    console.log('⚠️ Performing FORCE update...');
    const dirsToDelete = ['lib', 'plugins', 'node_modules/.cache'];
    for (const dir of dirsToDelete) {
        const dirPath = path.join(__dirname, dir);
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            console.log(`🗑️ Deleted: ${dir}`);
        }
    }
    await downloadBot();
    return true;
}

async function checkForSignals() {
    if (fs.existsSync(FORCE_UPDATE_FLAG_FILE)) {
        fs.unlinkSync(FORCE_UPDATE_FLAG_FILE);
        await performForceUpdate();
        return true;
    }
    if (fs.existsSync(UPDATE_FLAG_FILE)) {
        fs.unlinkSync(UPDATE_FLAG_FILE);
        await performUpdate();
        return true;
    }
    return false;
}

// ========== FIXED: NO DEMO MODE, ALWAYS LOAD REAL BOT ==========
async function startBot() {
    // Download if not exists
    if (!fs.existsSync(BOT_FILE)) {
        await downloadBot();
    }
    
    // Check if file is valid
    const stats = fs.statSync(BOT_FILE);
    if (stats.size < 100) {
        console.log('⚠️ Bot file seems corrupted, re-downloading...');
        await downloadBot();
    }
    
    console.log('🚀 Loading NEXUS-MD bot...');
    
    try {
        delete require.cache[require.resolve(BOT_FILE)];
        const botModule = require(BOT_FILE);
        console.log('✅ Bot loaded successfully!');
        
        // Start bot if it has start function
        if (botModule && typeof botModule.start === 'function') {
            botModule.start();
        }
        
        // Keep process alive
        const keepAlive = setInterval(() => {
            console.log('💓 Bot is running -', new Date().toLocaleTimeString());
        }, 3600000);
        
        process.on('SIGINT', () => {
            clearInterval(keepAlive);
            console.log('Shutting down...');
            process.exit(0);
        });
        
    } catch (err) {
        console.error('❌ Failed to load bot:', err.message);
        console.log('🔄 Retrying in 5 seconds...');
        setTimeout(() => startBot(), 5000);
    }
}

async function main() {
    console.log('╔════════════════════════════════╗');
    console.log('║     NEXUS-MD LOADER v3.1       ║');
    console.log('║     Running in PRODUCTION mode ║');
    console.log('╚════════════════════════════════╝');
    
    await checkForSignals();
    await startBot();
}

// ========== ERROR HANDLERS ==========
process.on('uncaughtException', (err) => {
    if (err.message.includes('ECONNRESET') || err.message.includes('ETIMEDOUT')) {
        console.log('⚠️ Network error, continuing...');
    } else {
        console.error('Uncaught Exception:', err.message);
        console.log('🔄 Restarting in 5 seconds...');
        setTimeout(() => process.exit(1), 5000);
    }
});

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});

// Don't exit on unhandled rejection
process.on('unhandledRejection', (reason) => {
    console.log('Unhandled Rejection:', reason);
});

main().catch(err => {
    console.error('Fatal error:', err.message);
    console.log('🔄 Restarting in 5 seconds...');
    setTimeout(() => process.exit(1), 5000);
});