import React from "react";

const BusinessSummary = () => {
  return (
    <div>
      <div class="stats bg-primary text-primary-content">
        <div class="stat">
          <div class="stat-title">Account balance</div>
          <div class="stat-value">$89,400</div>
          <div class="stat-actions">
            <button class="btn btn-sm btn-success">Add funds</button>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">Current balance</div>
          <div class="stat-value">$89,400</div>
          <div class="stat-actions">
            <button class="btn btn-sm">Withdrawal</button>
            <button class="btn btn-sm">deposit</button>
          </div>
        </div>
        <div class="stat">
          <div class="stat-title">Current balance</div>
          <div class="stat-value">$89,400</div>
          <div class="stat-actions">
            <button class="btn btn-sm">Withdrawal</button>
            <button class="btn btn-sm">deposit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
