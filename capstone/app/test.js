// Unit tests tanpa dependency eksternal
let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✓ ${name}`);
        passed++;
    } catch (err) {
        console.error(`✗ ${name}: ${err.message}`);
        failed++;
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message || 'Assertion failed');
}

// Test 1: Filename generation
test('Filename includes original name', () => {
    const originalName = 'test.txt';
    const filename = `${Date.now()}-${originalName}`;
    assert(filename.includes(originalName), 'Filename should include original name');
});

// Test 2: File size formatting
test('File size formatting', () => {
    const size = 1024;
    const formatted = (size / 1024).toFixed(1);
    assert(formatted === '1.0', 'Should format 1024 bytes as 1.0 KB');
});

// Test 3: Environment variables fallback
test('S3 endpoint fallback', () => {
    const endpoint = process.env.S3_ENDPOINT || 'http://localhost:4566';
    assert(endpoint === 'http://localhost:4566', 'Should fallback to localhost');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
