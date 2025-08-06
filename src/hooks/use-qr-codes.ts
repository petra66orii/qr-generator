// hooks/use-qr-codes.ts
"use client";
import { useState, useEffect } from 'react';
import { QRCode, QRCodeService } from '@/lib/database';
import { useAuth } from '@/contexts/auth-context';

export function useQRCodes() {
  const { user } = useAuth();
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQRCodes = async () => {
    if (!user) {
      setQRCodes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const codes = await QRCodeService.getByUserId(user.uid);
      setQRCodes(codes);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load QR codes');
      console.error('Error loading QR codes:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveQRCode = async (qrCodeData: Omit<QRCode, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const id = await QRCodeService.create({
        ...qrCodeData,
        userId: user.uid,
      });
      
      // Refresh the list
      await loadQRCodes();
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save QR code');
      throw err;
    }
  };

  const deleteQRCode = async (id: string) => {
    try {
      await QRCodeService.delete(id);
      // Remove from local state
      setQRCodes(codes => codes.filter(code => code.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete QR code');
      throw err;
    }
  };

  const updateQRCode = async (id: string, updates: Partial<QRCode>) => {
    try {
      await QRCodeService.update(id, updates);
      // Update local state
      setQRCodes(codes => 
        codes.map(code => 
          code.id === id ? { ...code, ...updates } : code
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update QR code');
      throw err;
    }
  };

  useEffect(() => {
    loadQRCodes();
  }, [user]);

  return {
    qrCodes,
    loading,
    error,
    saveQRCode,
    deleteQRCode,
    updateQRCode,
    refreshQRCodes: loadQRCodes,
  };
}
