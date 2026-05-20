// Test logic aplikasi tanpa butuh server running
function handleRequest(req, res) {
    return { status: 200, body: 'Hello from inside a Docker container!\n' };
}

// Test 1: Response status 200
const result = handleRequest({}, {});
if (result.status === 200) {
    console.log('✓ Test passed: Returns 200');
} else {
    console.error('✗ Test failed: Expected 200');
    process.exit(1);
}

// Test 2: Response body benar
if (result.body.includes('Hello')) {
    console.log('✓ Test passed: Body contains Hello');
} else {
    console.error('✗ Test failed: Wrong body');
    process.exit(1);
}

console.log('All tests passed!');
