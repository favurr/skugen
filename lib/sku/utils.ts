/**
 * SKU and EAN-13 generation utilities
 */

/**
 * Abbreviate a string for SKU:
 * - For name: take characters at positions 0, 3, 6 (if exist) and uppercase
 * - For attributes:
 *   * If string length <= 3: return string padded with 'X'
 *   * If string contains digits and letters (like "16GB"): take first 3 characters
 *   * If string is all letters (like "Black"): take first, second, and last characters
 *   * Otherwise: take first 3 alphanumeric characters
 * If fewer characters available, pad with 'X' to reach required length.
 */
export function abbreviateForSKU(input: string, type: 'name' | 'attr'): string {
  const clean = input.replace(/\s+/g, '').toUpperCase();

  if (type === 'name') {
    // Take every third character starting at index 0
    let result = '';
    for (let i = 0; i < clean.length && result.length < 3; i += 3) {
      result += clean[i];
    }
    // Pad with 'X' if needed
    while (result.length < 3) {
      result += 'X';
    }
    return result;
  } else {
    // For attributes
    if (clean.length <= 3) {
      // Pad with 'X' if needed
      let result = clean;
      while (result.length < 3) {
        result += 'X';
      }
      return result;
    }

    // Check if it's mostly digits and uppercase letters (like "16GB", "512GB")
    if (/^[A-Z0-9]+$/.test(clean)) {
      // Take first 3 characters
      return clean.slice(0, 3).padEnd(3, 'X');
    }

    // Check if it's all letters (like "Black")
    if (/^[A-Z]+$/.test(clean)) {
      // Take first, second, and last characters
      return (clean[0] + clean[1] + clean[clean.length - 1]).padEnd(3, 'X');
    }

    // Fallback: first three alphanumeric characters
    let result = '';
    for (let i = 0; i < clean.length && result.length < 3; i++) {
      if (/[A-Z0-9]/.test(clean[i])) {
        result += clean[i];
      }
    }
    while (result.length < 3) {
      result += 'X';
    }
    return result;
  }
}

/**
 * Generate SKU from product name and attributes
 * Format: ABB-ATT1-ATT2-SEQ (seq padded to 4 digits)
 */
export function generateSKU(name: string, attr1: string, attr2: string, sequence: number): string {
  const nameAbbr = abbreviateForSKU(name, 'name');
  const attr1Abbr = abbreviateForSKU(attr1, 'attr');
  const attr2Abbr = abbreviateForSKU(attr2, 'attr');
  const seqStr = String(sequence).padStart(4, '0');
  return `${nameAbbr}-${attr1Abbr}-${attr2Abbr}-${seqStr}`;
}

/**
 * Calculate EAN-13 checksum digit
 * Input: first 12 digits (string)
 * Returns: checksum digit (0-9)
 */
export function calculateEAN13Checksum(prefix12: string): number {
  if (prefix12.length !== 12) {
    throw new Error('Input must be exactly 12 digits');
  }
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(prefix12[i], 10);
    // Multiply by 1 for odd positions (1-indexed), 3 for even positions
    // In EAN-13, positions 1,3,5,... (odd) weight 1; positions 2,4,6,... (even) weight 3
    // Since string index starts at 0, odd positions correspond to even indices
    const weight = i % 2 === 0 ? 1 : 3; // i=0 (pos1) weight 1, i=1 (pos2) weight 3
    sum += digit * weight;
  }
  const modulo = sum % 10;
  return (10 - modulo) % 10;
}

/**
 * Generate EAN-13 from sequence
 * Uses fixed prefix 615 and category 110
 * Format: 615 110 SEQ(6) CHECKSUM
 */
export function generateEAN13(sequence: number): string {
  const prefix = '615';
  const category = '110';
  const seqStr = String(sequence).padStart(6, '0');
  const prefix12 = prefix + category + seqStr; // 3+3+6 = 12
  const checksum = calculateEAN13Checksum(prefix12);
  return prefix12 + checksum;
}