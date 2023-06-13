/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { PackagePolicy } from '@kbn/fleet-plugin/common';
import { apiService } from '../../../../utils/api_service';
import {
  EncryptedSyntheticsMonitor,
  ServiceLocationErrors,
  SyntheticsMonitor,
  SyntheticsMonitorWithId,
} from '../../../../../common/runtime_types';
import { SYNTHETICS_API_URLS } from '../../../../../common/constants';
import { DecryptedSyntheticsMonitorSavedObject } from '../../../../../common/types';

export const createMonitorAPI = async ({
  monitor,
}: {
  monitor: SyntheticsMonitor | EncryptedSyntheticsMonitor;
}): Promise<{ attributes: { errors: ServiceLocationErrors } } | SyntheticsMonitor> => {
  return await apiService.post(SYNTHETICS_API_URLS.SYNTHETICS_MONITORS, monitor);
};

export interface MonitorInspectResponse {
  publicConfigs: any[];
  privateConfig: PackagePolicy | null;
}

export const inspectMonitorAPI = async ({
  monitor,
  hideParams,
}: {
  hideParams?: boolean;
  monitor: SyntheticsMonitor | EncryptedSyntheticsMonitor;
}): Promise<{ result: MonitorInspectResponse; decodedCode: string }> => {
  return await apiService.post(SYNTHETICS_API_URLS.SYNTHETICS_MONITOR_INSPECT, monitor, undefined, {
    hideParams,
  });
};

export const updateMonitorAPI = async ({
  monitor,
  id,
}: {
  monitor: SyntheticsMonitor | EncryptedSyntheticsMonitor;
  id: string;
}): Promise<{ attributes: { errors: ServiceLocationErrors } } | SyntheticsMonitorWithId> => {
  return await apiService.put(`${SYNTHETICS_API_URLS.SYNTHETICS_MONITORS}/${id}`, monitor);
};

export const getDecryptedMonitorAPI = async ({
  id,
}: {
  id: string;
}): Promise<DecryptedSyntheticsMonitorSavedObject> => {
  return await apiService.get(
    SYNTHETICS_API_URLS.GET_SYNTHETICS_MONITOR.replace('{monitorId}', id),
    {
      decrypted: true,
    }
  );
};

export const fetchServiceAPIKey = async (): Promise<{
  apiKey: { encoded: string };
}> => {
  return await apiService.get(SYNTHETICS_API_URLS.SYNTHETICS_APIKEY);
};

export const deletePackagePolicy = async (
  packagePolicyId: string
): Promise<{
  apiKey: { encoded: string };
}> => {
  return await apiService.delete(
    SYNTHETICS_API_URLS.DELETE_PACKAGE_POLICY.replace('{packagePolicyId}', packagePolicyId)
  );
};
