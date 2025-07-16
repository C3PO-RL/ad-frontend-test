const useRouter = () => ({
    push: jest.fn(),
    refresh: jest.fn(),
});
const useSearchParams = () => new URLSearchParams();

module.exports = { useRouter, useSearchParams }; 