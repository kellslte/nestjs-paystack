#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Git commit message hook to validate conventional commit format
 * This ensures all commits follow the conventional commits specification
 */

class CommitMessageHook {
    constructor() {
        this.commitMsgFile = process.argv[2];
    }

    /**
     * Read the commit message from the file
     */
    readCommitMessage() {
        try {
            return fs.readFileSync(this.commitMsgFile, 'utf8').trim();
        } catch (error) {
            console.error('Error reading commit message file:', error.message);
            process.exit(1);
        }
    }

    /**
     * Validate conventional commit format
     */
    validateCommitMessage(message) {
        // Skip validation for merge commits and revert commits
        if (message.startsWith('Merge') || message.startsWith('Revert')) {
            return true;
        }

        // Conventional commit pattern
        const conventionalPattern = /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(?:\(([\w\-]+)\))?(!)?: (.+)/;

        if (!conventionalPattern.test(message)) {
            return false;
        }

        // Check if the description is not empty
        const match = message.match(conventionalPattern);
        if (!match || !match[4] || match[4].trim().length === 0) {
            return false;
        }

        return true;
    }

    /**
     * Show error message and examples
     */
    showError(message) {
        console.error('\n❌ Invalid commit message format');
        console.error(`\nReceived: "${message}"`);
        console.error('\nCommit message must follow the conventional commit format:');
        console.error('\n  <type>[optional scope]: <description>');
        console.error('\nExamples:');
        console.error('  feat: add new payment method');
        console.error('  fix(auth): resolve authentication issue');
        console.error('  docs: update README with new examples');
        console.error('  test: add unit tests for payment service');
        console.error('  chore: update dependencies');
        console.error('  feat!: breaking change in API');
        console.error('\nTypes: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert');
        console.error('\nBreaking changes: add ! after type/scope');
        console.error('\nScope: optional, in parentheses');
        console.error('\nDescription: required, starts with lowercase letter');
        console.error('\nFor more information, see: https://www.conventionalcommits.org/');
        process.exit(1);
    }

    /**
     * Run the commit message validation
     */
    run() {
        const message = this.readCommitMessage();

        if (!this.validateCommitMessage(message)) {
            this.showError(message);
        }

        console.log('✅ Commit message format is valid');
    }
}

// Run the hook if this script is executed directly
if (require.main === module) {
    const hook = new CommitMessageHook();
    hook.run();
}

module.exports = CommitMessageHook;
